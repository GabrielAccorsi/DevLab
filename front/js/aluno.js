document.addEventListener("DOMContentLoaded", async function () {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token || auth;
  const response = await fetch("http://localhost:3000/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    localStorage.removeItem("auth");
    window.location.href = "login.html";
    return;
  }

  const { user } = await response.json();
  if (!user) {
    localStorage.removeItem("auth");
    window.location.href = "login.html";
    return;
  } else {
    const userName = user.name || "Usuário DevLab";
    const userEmail = user.email;
    const bio = user.bio;
    console.log(bio);
    document.querySelector(".edit-button").addEventListener("click", () => {
      window.location.href = "personalizacao.html";
    });

    // Exibir nome
    const usuarioElements = document.querySelectorAll("#usuario");
    usuarioElements.forEach((element) => {
      element.innerText = `${userName}`;
    });

    // Exibir email
    const emailElement = document.getElementById("email_usuario");
    if (emailElement) {
      emailElement.innerText = userEmail;
      emailElement.href = `mailto:${userEmail}`;
    }

    // exibir bio
    const bioElement = document.querySelector(".description");
    if (bioElement) {
      bioElement.innerHTML = bio;
    }

    // Foto de perfil
    const userPhotoURL = user.avatar;
    const profileImg = document.querySelector(".profile-img2");
if (userPhotoURL && profileImg) {
  if (!userPhotoURL.startsWith("data:image")) {
    profileImg.src = `data:image/png;base64,${userPhotoURL}`;
  } else {
    profileImg.src = userPhotoURL;
  }
} else {
  profileImg.src = "imagens/entrar.png"; 

    }
  }
});

// Funções de exclusão
const excluirConta = () => {
  const confirmModal = document.getElementById("confirmModal");
  confirmModal.style.display = "flex";
};

const fecharModal = () => {
  const confirmModal = document.getElementById("confirmModal");
  confirmModal.style.display = "none";
};

const confirmarExclusao = async () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token || auth;

  const response = await fetch("http://localhost:3000/user/delete", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    localStorage.removeItem("auth");
    window.location.href = "login.html";
    return;
  }

  const { user } = await response.json();

  if (user.status === "inativo") {
    showAlert("Sua conta foi excluída com sucesso!");
    localStorage.removeItem("auth");
    fecharModal();
  } else {
    showAlert("Erro: Usuário não encontrado.");
    fecharModal();
  }
};


const showAlert = (message) => {
  const alertBox = document.getElementById("alertBox");
  const alertMessage = document.getElementById("alertMessage");
  alertMessage.textContent = message;
  alertBox.style.display = "flex";
};

document.getElementById("alertOkButton").addEventListener("click", () => {
  document.getElementById("alertBox").style.display = "none";
  window.location.href = "cadastro.html";
});

//           // menu
//           document.addEventListener('DOMContentLoaded', function () {
//               const hamburgerMenu = document.querySelector('.hamburger-menu');
//               const navLinks = document.querySelector('.nav_links');

//               hamburgerMenu.addEventListener('click', function (event) {
//                   event.stopPropagation();
//                   navLinks.classList.toggle('open');
//               });

//               document.addEventListener('click', function (event) {
//                   if (!navLinks.contains(event.target) && !hamburgerMenu.contains(event.target)) {
//                       navLinks.classList.remove('open')
//                   }
//               });
//           });
//           function entrar() {
//           document.getElementById('linkIndex').click();
//         }
