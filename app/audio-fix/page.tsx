"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle, Download, ExternalLink } from "lucide-react"

export default function AudioFixPage() {
  const [fileStatus, setFileStatus] = useState<Record<string, any>>({})

  useEffect(() => {
    const checkFiles = async () => {
      const files = ["/sounds/gorkhali.mp3"]
      const results: Record<string, any> = {}

      for (const file of files) {
        try {
          const response = await fetch(file, { method: "HEAD" })
          results[file] = {
            exists: response.ok,
            status: response.status,
            contentType: response.headers.get("content-type"),
            contentLength: response.headers.get("content-length"),
          }
        } catch (error) {
          results[file] = {
            exists: false,
            error: error instanceof Error ? error.message : String(error),
          }
        }
      }

      setFileStatus(results)
    }

    checkFiles()
  }, [])

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-8">🔧 Solución para el Audio de Gorkhali</h1>

        {/* Estado actual */}
        <div className="bg-black/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AlertCircle className="mr-2 text-yellow-400" />
            Estado Actual del Archivo
          </h2>

          {Object.entries(fileStatus).map(([file, status]) => (
            <div key={file} className="flex items-center space-x-3 mb-2">
              {status.exists ? (
                <CheckCircle className="text-green-400" size={20} />
              ) : (
                <XCircle className="text-red-400" size={20} />
              )}
              <span className="font-mono text-sm">{file}</span>
              <span className={`text-sm ${status.exists ? "text-green-400" : "text-red-400"}`}>
                {status.exists ? `✅ Disponible (${status.status})` : `❌ No encontrado (${status.status || "Error"})`}
              </span>
            </div>
          ))}
        </div>

        {/* Problema identificado */}
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-red-400">🚨 Problema Identificado</h2>
          <p className="mb-4">
            El archivo <code className="bg-black/50 px-2 py-1 rounded">gorkhali.mp3</code> no existe en el servidor de
            Vercel. Esto significa que:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>El archivo no se está desplegando correctamente desde tu repositorio</li>
            <li>No está en la ubicación correcta en tu proyecto local</li>
            <li>No se está incluyendo en el build de Vercel</li>
          </ul>
        </div>

        {/* Soluciones paso a paso */}
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-400">✅ Soluciones Paso a Paso</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">1. Verificar la estructura del proyecto</h3>
              <p className="text-gray-300 mb-2">Asegúrate de que tu proyecto tenga esta estructura:</p>
              <pre className="bg-black/50 p-4 rounded text-sm overflow-x-auto">
                {`tu-proyecto/
├── public/
│   └── sounds/
│       └── gorkhali.mp3  ← El archivo debe estar aquí
├── app/
├── components/
└── ...`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">2. Comandos Git para incluir el archivo</h3>
              <p className="text-gray-300 mb-2">Ejecuta estos comandos en tu terminal:</p>
              <pre className="bg-black/50 p-4 rounded text-sm overflow-x-auto">
                {`# Verificar que el archivo existe localmente
ls public/sounds/gorkhali.mp3

# Añadir el archivo al repositorio
git add public/sounds/gorkhali.mp3

# Hacer commit
git commit -m "Add Gorkhali audio file"

# Subir a GitHub
git push origin main`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">3. Verificar en GitHub</h3>
              <p className="text-gray-300 mb-2">
                Ve a tu repositorio en GitHub y verifica que el archivo aparezca en{" "}
                <code className="bg-black/50 px-2 py-1 rounded">public/sounds/gorkhali.mp3</code>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">4. Redesplegar en Vercel</h3>
              <p className="text-gray-300 mb-2">
                Vercel debería redesplegar automáticamente después del push. Si no, ve a tu dashboard de Vercel y
                redespliega manualmente.
              </p>
            </div>
          </div>
        </div>

        {/* Alternativas temporales */}
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">🔄 Alternativas Temporales</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Mientras se soluciona el problema:</h3>
              <div className="space-y-2">
                <a
                  href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gorkhali.mp3-IPbjFwUfuO5s7ipn05pE31pTgMSAaz.mp3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink size={16} />
                  <span>Escuchar el audio desde fuente externa</span>
                </a>

                <a
                  href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gorkhali.mp3-IPbjFwUfuO5s7ipn05pE31pTgMSAaz.mp3"
                  download="gorkhali.mp3"
                  className="flex items-center space-x-2 text-green-400 hover:text-green-300"
                >
                  <Download size={16} />
                  <span>Descargar el archivo MP3</span>
                </a>
              </div>
            </div>

            <div>
              <p className="text-gray-300">
                El reproductor actual está configurado para usar automáticamente la fuente externa si la local no está
                disponible.
              </p>
            </div>
          </div>
        </div>

        {/* Verificación */}
        <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">🔍 Verificación</h2>
          <p className="text-gray-300 mb-4">Después de seguir los pasos, verifica que funciona:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>
              Accede directamente a:{" "}
              <a
                href="/sounds/gorkhali.mp3"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 underline"
                rel="noreferrer"
              >
                /sounds/gorkhali.mp3
              </a>
            </li>
            <li>Debería descargarse o reproducirse el archivo, no mostrar 404</li>
            <li>Regresa a la página principal y prueba el reproductor</li>
            <li>Recarga esta página para ver el estado actualizado</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
