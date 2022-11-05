const btn = document.querySelector(".js-make-api-call");

btn.onclick = async (event) => {
  const originalClassName = btn.className;
  const originalContent = btn.textContent;
  btn.className = "btn btn-info";
  btn.textContent = "Loading...";

  var res = await fetch("/api/identity", { method: "POST" });
  var data = await res.json();
  console.log("data", data);

  await new Promise(resolve=>setTimeout(resolve, 1000));

  alert('Received the following data from the sever: '+ JSON.stringify(data));

  btn.className = originalClassName;
  btn.textContent = originalContent;
};
