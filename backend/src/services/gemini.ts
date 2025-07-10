import { GoogleGenAI } from "@google/genai"
import { env } from "../env.ts"

const gemini = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: "Transcreva o áudio para português brasileiro. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos curtos quando necessário.",
            },
            {
                inlineData: {
                    mimeType,
                    data: audioAsBase64,
                }
            }
        ]
    })

    if (!response.text) {
        throw new Error("Não foi possível transcrever o áudio.")
    }

    return response.text.trim()
}

export async function generateEmbeddings(text: string) {
    const response = await gemini.models.embedContent({
        model: "text-embedding-004",
        contents: [{ text }],
        config: {
            taskType: "RETRIEVAL_DOCUMENT",
        }
    })

    if (!response.embeddings?.[0].values) {
        throw new Error("Não foi possível gerar os embeddings.")
    }

    return response.embeddings[0].values
}

export async function generateAnswer(question: string, transcriptions: string[]) {
    const context = transcriptions.join("\n\n")

    const prompt = `
        Você é um assistente inteligente que responde perguntas com base em transcrições de áudio. Sua tarefa é responder a pergunta de forma clara e objetiva, utilizando as informações fornecidas nas transcrições em português brasileiro.

        CONTEXTO: 
        ${context}

        PERGUNTA: 
        ${question}

        INSTRUÇÕES:
        - Responda de forma clara e objetiva.
        - Utilize as informações fornecidas nas transcrições.
        - Se a reposta não for encontrada nas transcrições, informe que não foi possível encontrar a resposta.
        - Mantenha um tom educativo e amigável.
        - Cite trechos relevantes das transcrições para embasar sua resposta, se apropriado.
        - Se for citar o contexto, utilize o termo "conteúdo da aula
        - Use parágrafos se necessário para organizar a resposta.
    `.trim()

    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: prompt
            }
        ]
    })

    if (!response.text) {
        throw new Error("Não foi possível gerar a resposta pelo Gemini.")
    }

    return response.text.trim()
}