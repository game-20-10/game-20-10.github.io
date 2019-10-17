// Set key-value cookie
function setCookie(cname, cvalue, exdays) {
    var now = new Date();
    now.setTime(now.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + now.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// Get cookie value from cookie name
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// Check cookie exist
function checkCookie(cookieName) {
    var valCookie = getCookie(cookieName);
    if (valCookie != "") {
        return true;
    } else {
        return false;
    }
}
// Delete cookie
function deleteCookie(cookieName) {
    if (checkCookie(cookieName) === true) {
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}
// Set cookie when fail
function setCookieFail(score) {
    setCookie('result', score, 1);
    setCookie('turnPlay', Number(getCookie('turnPlay')) + 1, 1);
    location.replace('../result_score.html');
}
// Set cookie game
function setCookieGame(val) {
    setCookie('game', val, 1);
    setCookie('turnPlay', 0, 1);
    location.replace('./index.html');
}
// Redirect to neccessary page
function redirect() {
    if (checkCookie('game') === false) {
        location.replace("../game.html");
    } else {
        if (checkCookie('team') === false) {
            location.replace("../team.html");
        } else {
            switch (getCookie('game')) {
                case 'bird':
                    location.replace('../bird.html');
                    break;
                case 'marathon':
                    location.replace('../marathon.html');
                    break;
                case 'shooter':
                    location.replace('../shooter.html');
                    break;
            }
        }
    }
}
