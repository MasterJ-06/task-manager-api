const h3 = document.getElementById('name')
const Name_regex = document.cookie.match(/&.+&/)
if (Name_regex == null) {
    h3.textContent = 'Please login'
}
const Name = Name_regex[0].slice(1, -1)
h3.textContent = 'Welcome ' + Name + '!'