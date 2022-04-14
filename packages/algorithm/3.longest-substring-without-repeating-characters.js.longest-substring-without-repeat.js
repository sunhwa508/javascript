/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
 const lengthOfLongestSubstring = (s) => {
  let chars = {};
  let startPoint = 0;
  let maxLength = 0;
  
  for(let i = 0; i < s.length; i++) {
      const char = s[i];
      // char = a
      
      if (chars[char] >= startPoint) {
          startPoint = chars[char] + 1;
      }
      
      {0}
      chars[char] = i;
      maxLength = Math.max(maxLength, i - startPoint + 1);
  }
  
  return maxLength;
};
// @lc code=end

