firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (!user) {
      console.log("Nenhum usuário autenticado.");
      return;
    }
  

      const userRef = firebase.database().ref("users/" + user.uid);

      userRef.once("value").then((snapshot) => {
        const userData = snapshot.val();
  
        // Se os dados do usuário existirem
        if (userData) {
          const userName = userData.displayName || nome ||'Usuário DevLab';
          const userEmail = userData.email;
          const bio = userData.bio
          console.log(bio)
          document.querySelector(".edit-button").addEventListener("click", ()=>{
            window.location.href = "personalizacao.html";
          })
          
  
          // Exibir nome
          const usuarioElements = document.querySelectorAll('#usuario');
          usuarioElements.forEach(element => {
              element.innerText = `${userName}`;
          });
  
          // Exibir email
          const emailElement = document.getElementById('email_usuario');
          if (emailElement) {
              emailElement.innerText = userEmail;
              emailElement.href = `mailto:${userEmail}`;
          }
  
          // exibir bio 
          const bioElement = document.querySelector('.description')
          if(bioElement){
            bioElement.innerHTML = bio;
          }
  
          // Foto de perfil
          const profileImg = document.querySelector('.profile-img');
          if (profileImg) {
              const userPhotoURL = user.photoURL || userData.photoURL;
              if (userPhotoURL) {
                  profileImg.src = userPhotoURL;
              } else {
                  profileImg.src = 'imagens/entrar.png';
              }
          }
        }
      }).catch((error) => {
        console.error("Erro ao obter dados do usuário:", error);
      });
  
    } else {
      console.log("Nenhum usuário autenticado");
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
  
  const confirmarExclusao = () => {
    console.log("Iniciando a exclusão da conta...");
  
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      
      firebase.database().ref('users/' + userId).remove()
        .then(() => {
          return user.delete();
        })
        .then(() => {
          showAlert("Conta excluída com sucesso!");
          fecharModal();
        })
        .catch((error) => {
          if (error.code === 'auth/requires-recent-login') {
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
          const alertBox = document.getElementById("alertBox")
          const alertMessage = document.getElementById("alertMessage")
          alertMessage.textContent = message
          alertBox.style.display = "flex"}
  
          document.getElementById("alertOkButton").addEventListener("click", () => {
          document.getElementById("alertBox").style.display = "none"
          window.location.href = "cadastro.html"
          })
  
          // menu
          document.addEventListener('DOMContentLoaded', function () {
              const hamburgerMenu = document.querySelector('.hamburger-menu');
              const navLinks = document.querySelector('.nav_links');
  
              hamburgerMenu.addEventListener('click', function (event) {
                  event.stopPropagation();
                  navLinks.classList.toggle('open');
              });
  
              document.addEventListener('click', function (event) {
                  if (!navLinks.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                      navLinks.classList.remove('open')
                  }
              });
          });
          function entrar() {
          document.getElementById('linkIndex').click();
        }

