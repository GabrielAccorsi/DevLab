document.addEventListener("DOMContentLoaded", () => {

    const auth = JSON.parse(localStorage.getItem("auth"));
    const user = auth?.user;

    console.log(user);

    if (user.id) {
        // Usuário logado, carregar os dados
        const userId = user.id;
        fetchUserData(userId);
    } else {
        alert("Usuário não autenticado. Redirecionando para o login.");
        window.location.href = "login.html";
    }
});

// Função para buscar os dados do usuário no backend
async function fetchUserData(userId) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/user/${userId}`);
        const data = await response.json();

        if (data) {
            const nome = data.nome;
            const inicial = nome.charAt(0).toUpperCase();  

            document.getElementById("canvas").setAttribute("data-inicial", inicial);
            console.log(inicial);  -

            generateAvatar(inicial);
  
            createColorPicker();
        }
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
    }
}

// Função para gerar o avatar com a inicial
function generateAvatar(inicial) {
    const cores = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF", "#FFD733", "#33FFF5", "#FF9133", "#9133FF", "#FF3333"];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    --
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    ctx.beginPath();
    ctx.arc(60, 60, 60, 0, Math.PI * 2);
    ctx.fillStyle = corAleatoria;
    ctx.fill();

  
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(inicial, 60, 60);
}

// Função para criar os blocos de cor
function createColorPicker() {
    const cores = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF", "#FFD733", "#33FFF5", "#FF9133", "#9133FF", "#FF3333"];
    const colorPicker = document.getElementById("colorPicker");

    cores.forEach(cor => {
        const colorBlock = document.createElement("div");
        colorBlock.classList.add("color-block");
        colorBlock.style.backgroundColor = cor;

        colorBlock.addEventListener("click", () => {
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");

          
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(60, 60, 60, 0, Math.PI * 2);
            ctx.fillStyle = cor; 
            ctx.fill();
            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(canvas.getAttribute("data-inicial"), 60, 60);  
        });

        colorPicker.appendChild(colorBlock);
    });
}

// Atualizar dados do usuário (bio e foto)
document.getElementById("personalizacaoForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("userId");
    const bio = document.getElementById("bio").value.trim();
    const fotoUrl = document.getElementById("canvas").toDataURL();

    try {
        const response = await fetch(`http://127.0.0.1:3000/user/update/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bio,
                avatar: fotoUrl,
            }),
        });

        const data = await response.json();
        if (data.success) {
            window.location.href = "pagina_aluno.html";
        } else {
            alert("Erro ao atualizar perfil. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        alert("Erro ao atualizar perfil. Tente novamente.");
    }
});
