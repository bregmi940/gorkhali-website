"use client"

export default function AudioTestPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-md p-6 rounded-xl border border-[#D4AF37]/20">
        <h1 className="text-2xl font-bold text-[#D4AF37] mb-6">Prueba de Audio</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl text-[#D4AF37] mb-3">Reproductor Nativo</h2>
            <p className="text-gray-300 mb-4">
              Este es un reproductor de audio HTML5 estándar que debería funcionar en todos los navegadores:
            </p>

            <audio controls src="/sounds/gorkhali.mp3" className="w-full">
              Tu navegador no soporta el elemento de audio.
            </audio>
          </section>

          <section>
            <h2 className="text-xl text-[#D4AF37] mb-3">Información de Ruta</h2>
            <p className="text-gray-300 mb-2">El archivo de audio debe estar ubicado en:</p>
            <code className="block bg-black/70 p-3 rounded text-green-400 mb-4">public/sounds/gorkhali.mp3</code>
            <p className="text-gray-300 mb-2">Y debe ser accesible en la URL:</p>
            <code className="block bg-black/70 p-3 rounded text-green-400">/sounds/gorkhali.mp3</code>
          </section>

          <section>
            <h2 className="text-xl text-[#D4AF37] mb-3">Solución de Problemas</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>Verifica que el archivo exista en la ubicación correcta</li>
              <li>Asegúrate de que el nombre del archivo coincida exactamente (mayúsculas/minúsculas)</li>
              <li>Comprueba que el archivo no esté corrupto reproduciendo localmente</li>
              <li>Verifica que el formato sea compatible con los navegadores modernos</li>
              <li>Intenta convertir el archivo a otro formato (como .ogg) si persisten los problemas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-[#D4AF37] mb-3">Prueba de Fetch</h2>
            <p className="text-gray-300 mb-4">
              Haz clic en el botón para verificar si el archivo es accesible mediante fetch:
            </p>

            <div className="flex space-x-4">
              <button
                id="fetch-test-button"
                className="bg-[#D4AF37] text-black px-4 py-2 rounded hover:bg-[#FFD700] transition-colors"
                onClick={() => {
                  const resultElement = document.getElementById("fetch-result")
                  if (resultElement) {
                    resultElement.textContent = "Verificando..."
                    resultElement.className = "mt-3 p-3 rounded bg-gray-800 text-gray-300"

                    fetch("/sounds/gorkhali.mp3", { method: "HEAD" })
                      .then((response) => {
                        if (response.ok) {
                          resultElement.textContent = `✅ Archivo encontrado! Status: ${response.status}`
                          resultElement.className = "mt-3 p-3 rounded bg-green-900/50 text-green-300"
                        } else {
                          resultElement.textContent = `❌ Error ${response.status}: ${response.statusText}`
                          resultElement.className = "mt-3 p-3 rounded bg-red-900/50 text-red-300"
                        }
                      })
                      .catch((error) => {
                        resultElement.textContent = `❌ Error: ${error.message}`
                        resultElement.className = "mt-3 p-3 rounded bg-red-900/50 text-red-300"
                      })
                  }
                }}
              >
                Verificar Archivo
              </button>

              <button
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                onClick={() => {
                  window.open("/sounds/gorkhali.mp3", "_blank")
                }}
              >
                Abrir Directamente
              </button>
            </div>

            <div id="fetch-result" className="mt-3 p-3 rounded bg-gray-800 text-gray-300">
              Haz clic en "Verificar Archivo" para comprobar
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
