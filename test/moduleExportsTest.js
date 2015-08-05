// following code is wrong
//exports = function () {
//	console.log(1);
//};


// 当要将一个函数导出时，使用exports=是无效的，要使用module.exports
module.exports = function () {
	console.log(1);
};