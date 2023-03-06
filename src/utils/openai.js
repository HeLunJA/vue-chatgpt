import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  apiKey: ''
})
const openai = new OpenAIApi(configuration)

function chatOpenAi(typeKey, value) {
  return new Promise((resolve, reject) => {
    openai
      .createCompletion({
        model: typeKey,
        prompt: value,
        max_tokens: 2024,
        temperature: 0
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default chatOpenAi
