const btn = document.querySelector(".js-make-api-call");

const load = async () => {
  var res = await fetch("/api/identity", { method: "POST" });
  var data = await res.json();
  console.log("data", data);

  document.querySelector('.js-character').innerHTML = JSON.stringify(data, null, 3);
};

const attack = async () => {
  const originalClassName = btn.className;
  const originalContent = btn.textContent;
  btn.className = "btn btn-info";
  btn.textContent = "Loading...";

  await fetch("/api/attack", { method: "POST" });
  await load();

  btn.className = originalClassName;
  btn.textContent = originalContent;
};


btn.onclick = attack;

load();


