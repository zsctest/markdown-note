const markdown = function(content) {
	//将content解析为HTML
	//分段，一般是"\n"
	var pattern = /.*\n/g;       //这样就可以接收空字符加换行符\n了
	var result, html = "";
	let isCodeBlock = 0,blockCode = '';
	content = annotation(content);
	while ((result = pattern.exec(content)) != null) {
		let str = result.shift();
		console.log("str",str);
		
		//解析代码块
		let codeblockPattern = /```/;
		if(codeblockPattern.test(str)){
			//匹配到代码块开始，第二次是结束时，值会是2
			isCodeBlock++; 
			if(isCodeBlock == 2){
				html += codeblock(blockCode);
				//结束，回到原来状态
				blockCode = '';
				isCodeBlock = 0; 
			}  
			continue;
		}
		if(isCodeBlock<2 && isCodeBlock>0){
			blockCode += str;  //把块代码收集
			continue;
		}




		//解析标题，加粗，下划线，删除线，行内代码和分隔线
		let isTitle;
		let newStr;
		isTitle = title(str.slice(0));
		if (!isTitle) {
			//既不是标题也不是代码块
			let tempstr = solid(str);
			tempstr = underline(tempstr);
			tempstr = italic(tempstr);
			tempstr = delDash(tempstr);
			tempstr = codeline(tempstr);
			tempstr = gapLine(tempstr);
			newStr = '<p>' + tempstr + '</p>';
		} else if(isTitle){
			//是标题
			newStr = isTitle;
		}

		//解析注释块
		// let annotationPattern = /^>\s/;
		// if(annotationPattern.test(newStr)){
		// 	console.log("annotation");
		// 	annotation(newStr);
		// }

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
		});
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
	
	//识别代码块：连续的3个分段
	function codeblock(str){
		return '<div class="codeblock"><pre>' + str + '</pre></div>';
	}
	//注释块
	function annotation(str){
		let pattern = />\s.*\n/g;
		let result = null,
			replaceStr = [];
		console.log("in");
		while((result = pattern.exec(str))!= null){
			console.log("matched");
			let s = '';
			let fixStr = result[0].replace(/>\s/,'');
			// if(fixStr.length !== 0){
			s = '<blockquote class="annotation">'+fixStr+'</blockquote>';
			replaceStr.push(s);
			// }
		}
		let pattern2 = />\s.*\n/;
		replaceStr.forEach(s=>{
			str = str.replace(pattern2,s)
		})
		return str;
	}


	
}
export default markdown;
