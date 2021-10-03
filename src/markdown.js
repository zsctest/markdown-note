const markdown = function(content) {
	//将content解析为HTML
	//分段，一般是"\n"
	var pattern = /.+\n/g;
	var result, html = "";
	while ((result = pattern.exec(content)) != null) {
		let str = result.shift();
		//解析成HTML
		let isTitle;
		let newStr;
		isTitle = title(str);
		if (!isTitle) {
			let tempstr = solid(str);
			tempstr = underline(tempstr);
			tempstr = italic(tempstr);
			tempstr = delDash(tempstr);
			tempstr = codeline(tempstr);
			tempstr = gapLine(tempstr);
			tempstr = comment(tempstr);
			newStr = '<p>' + tempstr + '</p>';
		} else {
			newStr = isTitle;
		}
		html += newStr;
	}
	return html || "";

	//识别段中语法：标题，加粗，下划线，删除线，代码
	//识别标题
	function title(str) {
		let title = /#+\s/;
		if (title.test(str)) {
			let result = title.exec(str);
			let newStr = str.replace(title, () => {
				return '<h' + (result[0].length - 1) + '>';
			});
			return newStr + '</h' + (result[0].length - 1) + '>';
		}
		return false;
	}
	//**加粗**
	function solid(str) {
		let pattern = /\*{2}[^*]*\*?[^*]*\*{2}/g;
		let result = null,
			replaceStr = [];
		while ((result = pattern.exec(str)) != null) {
			let s = '';
			let fixStr = result[0].replace(/\*{2}/g, '').trim();   //空白字符或空字符串不用加粗
			if(fixStr.length !== 0)
			{
				s = '<strong>' + fixStr + '</strong>';
			}
			replaceStr.push(s.slice(0));
		}
		let pattern2 = /\*{2}[^*]*\*?[^*]*\*{2}/;
		replaceStr.forEach(s => {
			str = str.replace(pattern2, s);
		})
		return str;
	}
	//__下划线__
	function underline(str){
		let pattern = /_{2}[^_]*_?[^_]*_{2}/g;
		let result = null,
			replaceStr = [];
		while ((result = pattern.exec(str)) != null) {
			let s = '';
			let fixStr = result[0].replace(/_{2}/g, '').trim();   //空白字符或空字符串不用加粗
			if(fixStr.length !== 0)
			{
				s = '<u>' + fixStr + '</u>';
			}
			replaceStr.push(s.slice(0));
		}
		let pattern2 = /_{2}[^_]*_?[^_]*_{2}/;
		replaceStr.forEach(s => {
			str = str.replace(pattern2, s);
		})
		return str;
	}
	//*斜体*
	function italic(str){
		let pattern = /\*[^*]+\*/g;
		let result = null,
			replaceStr = [];
		while ((result = pattern.exec(str)) != null) {
			let s = '';
			let fixStr = result[0].replace(/\*/g, '').trim();   //空白字符或空字符串不用加粗
			if(fixStr.length !== 0)
			{
				s = '<i>' + fixStr + '</i>';
			}
			replaceStr.push(s.slice(0));
		}
		let pattern2 = /\*[^*]+\*/;
		replaceStr.forEach(s => {
			str = str.replace(pattern2, s);
		})
		return str;
	}
	//~~删除线~~
	function delDash(str){
		let pattern = /~~[^~]+~~/g;
		let result = null,
			replaceStr = [];
		while ((result = pattern.exec(str)) != null) {
			let s = '';
			let fixStr = result[0].replace(/~~/g, '').trim();   //空白字符或空字符串不用加粗
			if(fixStr.length !== 0)
			{
				s = '<del>' + fixStr + '</del>';
			}
			replaceStr.push(s.slice(0));
		}
		let pattern2 = /~~[^~]+~~/;
		replaceStr.forEach(s => {
			str = str.replace(pattern2, s);
		})
		return str;
	}
	//行内代码
	function codeline(str){
		let pattern = /`[^`]+`/g;
		let result = null,
			replaceStr = [];
		while ((result = pattern.exec(str)) != null) {
			let s = '';
			let fixStr = result[0].replace(/`/g, '').trim();   //空白字符或空字符串不用加粗
			if(fixStr.length !== 0)
			{
				s = '<code class="codeline">' + fixStr + '</code>';
			}
			replaceStr.push(s.slice(0));
		}
		let pattern2 = /`[^`]+`/;
		replaceStr.forEach(s => {
			str = str.replace(pattern2, s);
		})
		return str;
	}
	//分隔线
	function gapLine(str){
		let pattern = /-{3,}/g;
		while(pattern.test(str)){
			let s = '<br/><hr/><br/>';
			str = str.replace(pattern,s);
		}
		return str;
	}
	//注释块
	function comment(str){
		
		return str;
	}


	//识别代码块：连续的3个分段
}
export default markdown;
