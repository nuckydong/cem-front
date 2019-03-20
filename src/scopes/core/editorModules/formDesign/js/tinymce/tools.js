var formTool = {
  //样式转化(传入style对象)
  styleObjTranslate(obj) {
    var str = JSON.stringify(obj);
    var strObj = JSON.parse(str);
    if (obj.border) {
      delete strObj.border;
      if (obj.border.borderType == "none") {
        strObj.border = "none"
      } else if (obj.border.borderType == "all") {
        strObj.border = (obj.border.borderWidth || "1px") + " " + (obj.border.borderStyle || "solid") + " " + (obj.border.borderColor || "#ccc ");
      } else if (obj.border.borderType == "bottom") {
        strObj['border'] = 'none';
        strObj['border-bottom'] = (obj.border.borderWidth || "1px") + " " + (obj.border.borderStyle || "solid") + " " + (obj.border.borderColor || "#ccc");
      }
    }
    str = JSON.stringify(strObj);
    str = str.replace("{", "");
    str = str.replace("}", "");
    str = str.replace(/"/g, "");
    str = str.replace(/,/g, ";");
    str = str + ";";
    return {
      styleStr: str,
      styleObj: strObj
    }
  },







}
export default formTool;


