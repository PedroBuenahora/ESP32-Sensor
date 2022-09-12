const bulb = document.getElementById('bul');

bulb.addEventListener('change', showAlert);

function showAlert()
{
    alert ("Bulb in now ON");
}