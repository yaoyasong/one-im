
export function delHtmlTag(str)
{
  if (str) {
    return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
  }
  return str;
}


