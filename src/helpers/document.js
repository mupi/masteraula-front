export const first5Elements = (myLastDocumentsList) => {
  const myLast5DocumentsList = [];
  let count = 0;
  const countLimit = (myLastDocumentsList.length < 5 ? myLastDocumentsList.length : 5);

  while (count < countLimit) {
    myLast5DocumentsList.push(myLastDocumentsList[count]);
    count += 1;
  }

  return myLast5DocumentsList;
};
