

export function formarCurrency(item){
    return item.toLocaleString('ko-KR')
    // toLocalString 지역에 맞는 단위를 자동으로 구분해서 콤마을 찍어 줌
    /*
    ko-KR 한국
    en-US 미국
    ja-JP 일본
    zh-CN 중국   
    */ 
}