function applyClickOutToExit(id) {
  const list = document.getElementById(id + "-list");
  const btn = document.getElementById(id + "-btn");
  var isVisible = false;
  btn.addEventListener("click", () => {
    list.style.display = "block";
    btn.style.display = "none";
    setTimeout(() => {
      isVisible = true;
    }, 100);
  });

  document.addEventListener("click", function (e) {
    if (list.contains(e.target) == false && isVisible) {
      console.log("close");
      list.style.display = "none";
      btn.style.display = "block";
      isVisible = false;
    }
  });
}

applyClickOutToExit("ingredients");
applyClickOutToExit("appliances");
applyClickOutToExit("ustensils");
