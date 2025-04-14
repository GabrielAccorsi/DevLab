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
    const profileImg = document.querySelector(".profile-img");
    if (profileImg) {
      const userPhotoURL = user.avatar || userData.photoURL;
      if (userPhotoURL) {
        profileImg.src = userPhotoURL;
      } else {
        profileImg.src = "imagens/entrar.png";
      }
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
  if (user) {
    const userId = user.uid;

    firebase
      .database()
      .ref("users/" + userId)
      .remove()
      .then(() => {
        return user.delete();
      })
      .then(() => {
        showAlert("Conta excluída com sucesso!");
        fecharModal();
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          showAlert("Por favor, faça login novamente para excluir sua conta.");
        } else {
          showAlert("Erro ao excluir a conta. Tente novamente.");
        }
        fecharModal();
      });
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
