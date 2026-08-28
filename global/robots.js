function redirect(relativePath) {
    window.location.href = relativePath;
}

function redirectToRobot(teamNumber, year) {
    const url = `../${teamNumber}/robot/${year}`;
    window.location.href = url;
}