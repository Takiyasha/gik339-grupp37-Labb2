async function fetchUsersAndDisplay() {
  try {
    // Använd fetch för att hämta användardata från servern
    const response = await fetch("http://localhost:3000/user");
    // Konvertera svaret till JSON-format
    const users = await response.json();

    const userList = document.createElement("ul");
    userList.className = "user-list"; // Klass för styling

    users.forEach((user) => {
      const userItem = document.createElement("li");
      userItem.className = "user-item"; // Klass för styling
      userItem.style.borderColor = user.color; // Använd user.color för kanten

      userItem.innerHTML = `
              <div class="user-info">
                  <div class="user-details">
                      <h2 class="user-name">${user.firstName} ${user.lastName}</h2>
                      <p class="user-username">@${user.username}</p>
                      <p class="user-username">${user.username}@du.se</p>
                  </div>
              </div>
          `;

      userList.appendChild(userItem);
    });

    // Lägg till den kompletta listan i DOM-trädet under id"user-list-container"
    document.getElementById("user-list-container").appendChild(userList);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

fetchUsersAndDisplay();
