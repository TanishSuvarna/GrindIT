
// import React from 'react'
// import "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
// import "https://www.w3schools.com/w3css/4/w3.css"
// import "text.css"
// const index = () => {
//   return (
//     <html lang="en-US">
//     <body class="mt32">
//         <div class="container">
//             <h3>
//                 <span>Search for Topics</span>
//                 <input type="search" placeholder="Search..." class="form-control search-input" data-table="topics-list"/>
//             </h3>
//             <table class="table table-striped mt32 topics-list">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Sites</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>1</td> 
//                         <td >Hash-Table <span class="circle">50</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/hashing-data-structure/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.javatpoint.com/introduction-to-hashing" target="_blank">Javatpoint</a></td>
//                     </tr>
//                     <tr>
//                          <td>2</td> 
//                         <td>BackTracking <span class="circle">63</span></td>
//                         <td><a href="https://www.interviewbit.com/courses/programming/backtracking/" target="_blank">Interviewbit</a> &nbsp; &nbsp;&nbsp;&nbsp;<a href="https://www.geeksforgeeks.org/introduction-to-backtracking-data-structure-and-algorithm-tutorials/" target="_blank">GFG</a></td>
//                     </tr>
//                     <tr>
//                          <td>3</td> 
//                         <td>Recursion <span class="circle">43</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/introduction-to-recursion-data-structure-and-algorithm-tutorials/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.w3schools.io/recursion/" target="_blank">w3schools</a></td> 
    
//                     </tr>
//                     <tr>
//                         <td>4</td> 
//                         <td>Arrays <span class="circle">99</span></td>
//                         <td><a href="https://www.tutorialspoint.com/data_structures_algorithms/array_data_structure.htm" target="_blank">Tutorialspoint</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.javatpoint.com/data-structure-array" target="_blank">Javatpoint</a></td> 
//                     </tr>
//                     <tr>
//                          <td>5</td> 
//                         <td>Graphs <span class="circle">80</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.programiz.com/dsa/graph" target="_blank">Programiz</a></td> 
//                     </tr>
//                     <tr>
//                          <td>6</td> 
//                         <td>Trees <span class="circle">30</span></td>
//                         <td><a href="https://www.tutorialspoint.com/data_structures_algorithms/tree_data_structure.htm" target="_blank">Tutorialspoint</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
//                             <a href="https://www.geeksforgeeks.org/binary-tree-data-structure/" target="_blank">GFG</a></td> 
//                     </tr>
//                     <tr>
//                          <td>7</td> 
//                         <td>Breadth-First Search <span class="circle">20</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.javatpoint.com/breadth-first-search-algorithm" target="_blank">Javatpoint</a></td> 
//                     </tr>
//                     <tr>
//                          <td>8</td> 
//                         <td>Depth-First Search <span class="circle">59</span></td>
//                         <td> <a href="https://www.tutorialspoint.com/data_structures_algorithms/depth_first_traversal.htm" target="_blank">Tutorialspoint</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/" target="_blank">GFG</a> </td> 
//                     </tr>
//                     <tr>
//                          <td>8</td> 

//                         <td>String <span class="circle">39</span></td>
//                         <td><a href="https://www.javatpoint.com/c-strings" target="_blank">Javatpoint</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.geeksforgeeks.org/string-data-structure/" target="_blank">GFG</a></td> 
//                     </tr>
//                     <tr>
//                          <td>8</td> 

//                         <td>Dynamic Programming<span class="circle">40</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/dynamic-programming/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.programiz.com/dsa/dynamic-programming" target="_blank">Programiz</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Math <span class="circle">38</span></td>
//                         <td><a href="https://medium.com/coderbyte/how-to-get-good-at-algorithms-data-structures-d33d5163353f" target="_blank">Medium.com</a> </td> 
//                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="" target="_blank">w3schools</a> 

//                     </tr>
//                     <tr>
//                         <td>Sorting <span class="circle">27</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/sorting-algorithms/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://visualgo.net/en/sorting?slide=1" target="_blank">Visualgo</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Greedy <span class="circle">26</span></td>
//                         <td><a href="https://www.tutorialspoint.com/data_structures_algorithms/greedy_algorithms.htm" target="_blank">Tutorialspoint</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.w3schools.in/data-structures/greedy-algorithm/" target="_blank">w3schools</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Binary Search <span class="circle">19</span></td>
//                         <td><a href="https://www.programiz.com/dsa/binary-search" target="_blank">Programmiz</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.geeksforgeeks.org/binary-search/" target="_blank">GFG</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Matrix <span class="circle">18</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/array-data-structure/matrix-data-structure/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.javatpoint.com/sparse-matrix" target="_blank">Javatpoint</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Binary Tree <span class="circle">62</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/binary-tree-data-structure/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.javatpoint.com/binary-tree" target="_blank">Javatpoint</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Two Pointers <span class="circle">17</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/two-pointers-technique/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.interviewbit.com/courses/programming/two-pointers/" target="_blank">Interviewbit</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Bit Manipulation <span class="circle">49</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/all-about-bit-manipulation/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.javatpoint.com/bit-manipulation-cpp" target="_blank">Javatpoint</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Stack <span class="circle">34</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/stack-data-structure/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.tutorialspoint.com/data_structures_algorithms/stack_algorithm.htm" target="_blank">Tutorialspoint</a></td> 
//                     </tr>
                 
//                     <tr>
//                         <td>Linked List <span class="circle">69</span></td>
//                         <td><a href="https://www.tutorialspoint.com/data_structures_algorithms/linked_list_algorithms.htm" target="_blank">Tutorialspoint</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.geeksforgeeks.org/data-structures/linked-list/" target="_blank">GFG</a></td> 
//                     </tr>
//                      <tr>
//                         <td>Ordered Set <span class="circle">50</span></td>
//                         <td><a href="#" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" target="_blank">w3schools</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Monotonic Stack <span class="circle">40</span></td>
//                         <td><a href="#" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" target="_blank">w3schools</a></td> 
//                     </tr> 

//                     <tr>
//                         <td>Trie <span class="circle">42</span></td>
//                          <td><a href="https://www.javatpoint.com/trie-data-structure" target="_blank">Javatpoint</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.geeksforgeeks.org/trie-insert-and-search/" target="_blank">GFG</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Divide and Conquer <span class="circle">16</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/introduction-to-divide-and-conquer-algorithm-data-structure-and-algorithm-tutorials/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.programiz.com/dsa/divide-and-conquer" target="_blank">Programiz</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Binary Search Tree <span class="circle">40</span></td>
//                         <td><a href="https://www.tutorialspoint.com/data_structures_algorithms/binary_search_tree.htm" target="_blank">Tutorialspoint</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.geeksforgeeks.org/binary-search-tree-data-structure/" target="_blank">GFG</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Heap(Priority Queue) <span class="circle">9</span></td>
//                         <td><a href="https://www.tutorialspoint.com/data_structures_algorithms/heap_data_structure.htm" target="_blank">Tutorialspoint</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.geeksforgeeks.org/heap-data-structure/" target="_blank">GFG</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Prefix Sum <span class="circle">15</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.tutorialspoint.com/prefix-and-postfix-expressions-in-data-structure" target="_blank">Tutorialspoint</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Counting <span class="circle">80</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/counting-sort/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.programiz.com/dsa/counting-sort" target="_blank">Programiz</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Sliding Window <span class="circle">78</span></td>
//                         <td><a href="https://medium.com/techie-delight/data-structure-sliding-window-technique-problems-7c7f1f32597" target="_blank">Medium.com</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.geeksforgeeks.org/window-sliding-technique/" target="_blank">GFG</a>  </td> 
//                     </tr>
//                     <tr>
//                         <td>Queue <span class="circle">36</span></td>
//                         <td><a href="https://www.javatpoint.com/data-structure-queue" target="_blank">Javatpoint</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.geeksforgeeks.org/queue-data-structure/" target="_blank">GFG</a></td> 
//                     </tr>
//                     <tr>
//                         <td>Memoization <span class="circle">32</span></td>
//                         <td><a href="https://www.geeksforgeeks.org/memoization-1d-2d-and-3d/" target="_blank">GFG</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.tutorialspoint.com/memorization-1d-2d-and-3d-dynamic-programming-in-java" target="_blank">Tutorialspoint</a></td> 
//                     </tr>
                    
                    
//                 </tbody>
//             </table>
//         </div>
//     </body>
//     </html>
//   )
// }

// export default index

