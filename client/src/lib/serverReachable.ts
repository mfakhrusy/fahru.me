// taken from: https://gist.github.com/tspringborg/5917663 with some edits

export const serverReachable = function () {
  const xhr = new XMLHttpRequest();
  const localhostHostnames = ["localhost", "0.0.0.0", "127.0.0.1"];
  const currentHostname = window.location.hostname;

  if (localhostHostnames.includes(currentHostname)) {
    return true;
  }

  xhr.open("HEAD", "//" + currentHostname + "/?rand=" + Math.random(), false);

  try {
    xhr.send();
    const status = xhr.status;
    return (status >= 200 && status < 300) || status === 304;
  } catch (error) {
    return false;
  }
};
