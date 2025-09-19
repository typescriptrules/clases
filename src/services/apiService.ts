import axios from 'axios';

export async function getRandomTrivia(num:string = "random"): Promise<string> {
  try {
    const { data } = await axios.get(`http://numbersapi.com/${num}/trivia?notfound=floor`, {
      responseType: 'text',
    });
    return data;
  } catch (error) {
    console.error('Error fetching trivia from Numbers API:', error);
    throw new Error('No se pudo obtener el dato de la Numbers API');
  }
}