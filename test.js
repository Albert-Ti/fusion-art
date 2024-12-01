async function generateImage() {
  const url = 'https://api-key.fusionbrain.ai/key/api/v1/text2image/run'

  // Параметры API
  const apiKey = process.env.FUSION_BRAIN_API_KEY
  const secretKey = process.env.FUSION_BRAIN_SECRET_KEY

  // Тело запроса
  const body = JSON.stringify({
    type: 'GENERATE',
    numImages: 1, // Количество изображений
    width: 1024, // Ширина изображения
    height: 1024, // Высота изображения
    generateParams: {
      query: 'Море', // Текстовое описание для генерации изображения
    },
  })

  try {
    // Отправка запроса
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Key': `Key ${apiKey}`, // Ваш API ключ
        'X-Secret': `Secret ${secretKey}`, // Ваш секретный ключ
        'Content-Type': 'application/json', // Тип содержимого
      },
      body: body,
    })

    // Обработка ответа
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error:', errorData)
      throw new Error('API request failed')
    }

    const data = await response.json()
    console.log('Generated image UUID:', data.uuid)

    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Вызов функции для генерации изображения
generateImage()
