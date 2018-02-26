const copyToClipboard = (val) => {
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute("id", "dummy_id");
  document.getElementById("dummy_id").value = val;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

export default copyToClipboard;
