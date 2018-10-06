var lengthOfLongestSubstring = function(s) {
    let temp = ""
    let count = 0;
    let cache = {};
    let pointer = 0
    for(var i=0;i<s.length;i++){
        if(cache[s[i]] >= pointer){
            i-pointer > count ? count = i-pointer : null
            pointer = cache[s[i]]+1
            cache[s[i]] = i
        } else{
            cache[s[i]] = i
        }
    }
    return Math.max(s.length-pointer, count)
};

/*

Time Complexity: O(N)
Space Complexity: O(N)

*/