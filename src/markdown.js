const markdown = function(content) {
	//将content解析为HTML
	//分段，一般是"\n"
	var pattern = /.+\n/g;       //这样就可以接收空字符加换行符\n了
	var result, html = "";
	let isCodeBlock = 0,blockCode = '';
	//处理注释
	// content = annotation(content);
	while ((result = pattern.exec(content)) != null) {
		let str = result.shift();
		// console.log("str",str);
		
		//解析代码块
		let codeblockPattern = /^```/;
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
			let tempstr = dealHtml(str);
			tempstr = solid(tempstr);
			tempstr = linkMark(tempstr);
			tempstr = underline(tempstr);
			tempstr = italic(tempstr);
			tempstr = delDash(tempstr);
			tempstr = codeline(tempstr);
			tempstr = gapLine(tempstr);
			tempstr = annotation(tempstr);
			newStr = '<p>' + tempstr + '</p>';
		} else if(isTitle){
			//是标题
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
		let pattern = /^>\s.*\n/g;
		if(pattern.test(str)){
			let fixStr = str.replace(/^>\s/,'');
			let s = '<blockquote class="annotation">'+fixStr+'</blockquote>';
			str = str.replace(/^>\s.*\n/,s);
			
		}
		return str;
	}
	//链接处理
	function linkMark(str){
		let url = /(\[.*\])(\(.*\))/g;
		let result = null,
			replaceStr = [];
		while((result = url.exec(str))!= null){

			let url = result[2].slice(1,result[2].length-1);
			let linkname = result[1].length > 2?result[1].slice(1,result[1].length-1):url;
			let s = '<a href="'+url+'" target="_blank"><i>'+linkname+'</i></a>';
			replaceStr.push(s.slice(0));

		}
		let pattern = /(\[.*\])(\(.*\))/;
		replaceStr.forEach(s=>{
			str = str.replace(pattern,s);
		})

		return str;
	}
	//处理HTML标签
	function dealHtml(str){
		let pattern = /<\s?[^<>]+\s?>/g;
		let result = null,
			replaceStr = [];
		while((result = pattern.exec(str))!=null){
			let s = '&lt;'+result[0].slice(1,result[0].length-1)+"&gt;";
			replaceStr.push(s);
		}
		let pattern2 = /<\s?[^<>]+\s?>/;
		replaceStr.forEach(s=>{
			str = str.replace(pattern2,s);
		});
		console.log("new",str);
		return str;
	}

	
}
export default markdown;
