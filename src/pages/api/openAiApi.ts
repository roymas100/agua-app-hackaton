import OpenAIApi from 'openai'
import { encode } from 'gpt-tokenizer'

export class OpenAI {
  private model = 'gpt-4'
  private openai = new OpenAIApi({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY
  })
  private maxGPT4Tokens = 1000
  private defaultPrompt = ""

  constructor({
    prompt
  }: {
    prompt?: string
  }) {
    this.defaultPrompt = prompt!
  }

  getCost(text: string) {

    const textParts = this.divideRequestPerMaxTokens(text);

    let cost = 0
    for (const part of textParts.compressedTextPartsWithPrompt) {
      cost += getCostByTokens(this.getNumberOfTokens(part))
    }

    function getCostByTokens(tokens: number) {
      const GPT_4_OUTPUT_PRICE = 0.06 // dollars
      const GPT_4_INPUT_PRICE = 0.03 // dollars

      return (tokens / 1000 * GPT_4_INPUT_PRICE) + (tokens / 1000 * GPT_4_OUTPUT_PRICE)
    }

    return cost
  }

  private getNumberOfTokens(text: string) {
    const tokens = encode(text)

    return tokens.length
  }

  divideRequestPerMaxTokens(text: string, maxTokens: number = this.maxGPT4Tokens) {
    const textParts = text.split('\n\n').filter(item => !!item);
    const compressedTextParts: string[] = []
    const compressedTextPartsWithPrompt: string[] = []

    const NUMBER_OF_PARTS = textParts.length
    let i = 0
    let isLoopRunning = true
    while (isLoopRunning) {
      // se a parte da string tiver menos de 1000 caracteres
      let provTextWithPrompt = (this.defaultPrompt + '\n' + textParts[i])
      let provText = textParts[i]

      // verificação se é possivel concatenar partes de texto sem sobrepor caracteres
      for (let j = i + 1; j < NUMBER_OF_PARTS; j++) {
        const sucessorConcatWithPrompt = (provTextWithPrompt + '\n' + textParts[j])
        const sucessorConcat = (provText + '\n' + textParts[j])
        // se atingir limite da verificaçao e tiver no cache uma string ainda
        // adicione essa string mesmo se nao tiver atingido seu limite e acabe com todo o loop pois todo o texto foi compilado 
        if (j === NUMBER_OF_PARTS - 1) {
          compressedTextParts.push(provText)
          compressedTextPartsWithPrompt.push(provTextWithPrompt)
          isLoopRunning = false
        } else
          // se a string concatenada com seu sucessor tiver mais de 1000 caracteres, 
          // guarde na fila o que estava em cache e comece a nova verificação na falha
          if (this.getNumberOfTokens(sucessorConcatWithPrompt) >= maxTokens) {
            compressedTextPartsWithPrompt.push(provTextWithPrompt)
            compressedTextParts.push(provText)
            i = j
            j = NUMBER_OF_PARTS
            // se a string concatenada com seu sucessor tiver menos de 1000 caracteres
            // adicione o seu sucessor a sua string
          } else {
            provTextWithPrompt = sucessorConcatWithPrompt
            provText = sucessorConcat
          }
      }
    }
    return { compressedTextPartsWithPrompt, compressedTextParts }
  }

  async request(text: string, prompt: string = this.defaultPrompt) {
    if (this.getNumberOfTokens(prompt + text) >= this.maxGPT4Tokens) {
      throw new Error('Request overlaps the limit of 1000 tokens')
    }

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: prompt },
          {
            role: 'user', content: text
          }],
        model: this.model
      })

      if (completion.choices[0].message.content == null) {
        throw new Error(completion.choices[0].finish_reason)
      }

      return completion.choices[0].message.content
    } catch (err) {

    }
  }
}

