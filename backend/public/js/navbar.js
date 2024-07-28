function toggleMenu() {
    var navbar = document.getElementById("navbar");
    if (navbar.className === "nav-list") {
      navbar.className += " responsive";
    } else {
      navbar.className = "nav-list";
    }
  }
  