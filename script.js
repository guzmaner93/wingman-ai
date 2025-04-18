const API_KEY = "AIzaSyDemTgoa5kOfS8VdNsIKxrfY0B4l4EQ1K0"; 
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent?key=${API_KEY}`;

    async function generarRespuesta() {
      const input = document.getElementById("inputMensaje").value.trim();
      const output = document.getElementById("respuesta");
      const loader = document.getElementById("loader");
      const otra = document.getElementById("btnOtra");

      if (!input) {
        output.innerText = "⚠️ Por favor, escribe un mensaje primero.";
        output.classList.add("visible");
        return;
      }

      loader.style.display = "block";
      output.style.opacity = 1;
      otra.style.display = "none";

      const prompt = `
Actúa como un experto en respuestas para apps de citas. Responde de forma sutil, atractiva y creativa a este mensaje:

"${input}"

Dame solo una opción interesante, evitando lo vulgar, desesperado o aburrido.
`;

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
          })
        });

        const data = await res.json();
        const message = data?.candidates?.[0]?.content?.parts?.[0]?.text || "❌ No se generó una respuesta.";

        output.innerText = message;
        output.classList.add("visible");
        loader.style.display = "none";
        otra.style.display = "inline-block";
      } catch (error) {
        output.innerText = "❌ Ocurrió un error al generar la respuesta.";
        loader.style.display = "none";
        console.error(error);
      }
    }