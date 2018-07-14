// 1. 给定2个单向链表，每个节点包含一个0 - 9的数字，要求返回他们对应节点相加后产生的链表，例如：
// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8

// 2.有个小偷来到了一个地方准备实施他的盗窃计划，整个城市类似一个二叉树一样，
// 所有的节点有且仅有一个父亲节点，最多拥有2个孩子节点。
// 每个房子藏有相应的金条，现在有个条件，小偷不允许偷直接相邻2个房子的金条。
// 给定一个房子的布局，求小偷做多能偷取的金条数是多少。

// 示例1:
//      3
//       / \
//    2   3
//     \   \
//      3   1
// 小偷能偷取的最大金条是:  3 + 3 + 1 = 7.

// 示例2:
//      3
//       / \
//    4   5
//     / \   \
//  1   3   1
// 小偷能偷取的最大金条是:  4 + 5 = 9.

// 3 二叉树比较
// 1）写出比较两颗二叉树是否相等(包括结构及节点值)的算法。
// 2）html节点树能否用1）算法比较，是否存在优化方案？

// 4. 给定两个有序（从小到大）数组 nums1 和nums2，他们的大小分别为 m和 n，
// 要求找出2个数组合并后的中位数，要求算法实现的时间复杂度为 O(log(m + n))
// 示例 1:
// nums1 = [1, 3]
// nums2 = [2]
// 中位数是 2.0
// 示例 2:
// nums1 = [1, 2]
// nums2 = [3, 4]
// 中位数是 (2 + 3) / 2 = 2.5