export const downloadMedia = async (e, originalImage) => {
  e.preventDefault();
  try {
    fetch(originalImage)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;

        const nameSplit = originalImage.split("/");
        const duplicateName = nameSplit.pop();

        // the filename you want
        a.download = "" + duplicateName + "";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) =>
        console.log("Error while downloading the image ", error)
      );
  } catch (error) {
    console.log("Error while downloading the image ", error);
  }
};

export const formatDate = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};

export const formatDate2 = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatTimeAMPM = (date) => {
  let hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const time = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${ampm}`;
  return time;
};

export const formatTimeAMPM2 = (date) => {
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedTime = new Date(date).toLocaleTimeString([], timeOptions);
  return formattedTime;
};
