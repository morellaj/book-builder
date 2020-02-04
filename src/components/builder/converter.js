export default function (item) {
  if (item.constructor === String) {
    const step1 = `[${item}]`;
    const step2 = step1.replace(/([A-Za-z0-9_$\.][A-Za-z0-9_ \-,'?!.$]*)/g, '"$1"');
    const step3 = step2.replace(/(?:")([A-Za-z0-9_$\.][A-Za-z0-9_ \-,'?!.$]*)(?:")(?:;)/g, '"$1",');
    const step4 = JSON.parse(step3);
    return step4;
  }
  if (item.constructor === Array) {
    const step1 = JSON.stringify(item).split('},').join('},\n').slice(1, -1);
    const step2 = step1.replace(/(?:")([A-Za-z0-9_$\.][A-Za-z0-9_ \-,'?!.$]*)(?:")(?:,)/g, '$1; ');
    const step3 = step2.replace(/(?:")([A-Za-z0-9_$\.][A-Za-z0-9_ \-,'?!.$]*)(?:")/g, '$1');
    return step3;
  }
  return null;
}


/*

    const step1 = `[${item}]`;
    const step2 = step1.replace(/([A-Za-z0-9_$\.][A-Za-z0-9_ \-,'.$]*)/g, '"$1"');
    const step3 = step2.replace(/(?:")([A-Za-z0-9_$\.][A-Za-z0-9_ \-,'.$]*)(?:")(?:;)/g, '"$1",');
    const step4 = JSON.parse(step3);
    console.log(step4);
    return step4;

        const step1 = JSON.stringify(item).split('},').join('},\n').slice(1, -1);
    const step2 = step1.replace(/(?:")([A-Za-z0-9_$\.][A-Za-z0-9_ \-,'.$]*)(?:")(?:,)/g, '$1;');
    const step3 = step2.replace(/(?:")([A-Za-z0-9_$\.][A-Za-z0-9_ \-,'.$]*)(?:")/g, '$1');
    console.log(step3);
    return step3;
    */
