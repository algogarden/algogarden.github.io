---
layout: post
title: "Tối ưu hóa cache với LFU và LRU"
description: "Tìm hiểu hai thuật toán chính LFU và LRU được sử dụng trong cache nhằm tối ưu hóa hiệu suất. "
image: apache-kafka.png
categories: work
---

Tối ưu hóa luôn là vấn đề được quan tâm hàng đầu trong nhiều lĩnh vực. Bởi vì tài nguyên chúng ta đang sử dụng có giới hạn, vậy nên con người luôn tìm cách giảm thiếu chi phí và thời gian tới mức tối thiểu.

Trong lập trình cũng vậy, chúng ta cũng phải đối mặt với vấn đề tối ưu hóa thường xuyên. Thực tế, câu hỏi <b>"Làm sao để tối ưu ?"</b> được đặt ra nhiều hơn khi đi làm so với khi còn ngồi trên ghế nhà trường.

Khi còn ở trường, vấn đề tối ưu đầu tiên tôi gặp phải là <b> tối ưu thuật toán fibonaci</b>. Nếu sử dụng cách đệ quy thông thường thì O(n) sẽ là 2<sup>n</sup>. Để tối ưu bài toán, có thể cân nhắc đến kĩ thuật <b>memorization</b> giảm chi phí cho bài toán xuống còn O(n) = n. Bản chất đằng sau của thuật toán này là lưu lại các giá trị đã tính trước để phục vụ cho sau này.

Khi đi làm, để tối ưu trải nghiệm của người dùng sử dụng website thì tôi sử dụng cache. Đây là một hệ thống quan trọng để cải thiện hiệu năng của ứng dụng thông qua việc cho phép truy cập và trích xuất dữ liệu nhanh hơn. Mặc dù có khá nhiều ứng dụng cho cache và phụ thuộc vào tính chất công việc, nhưng ý tưởng đằng sau đó khá đơn giản. 

> <p style="font-size:16px;text-align:center">Lưu trữ những dữ liệu cần thiết hoặc được sử dụng nhiều trong một "kho chứa" để lần lấy ra tiếp theo sẽ nhanh hơn.</p>

Trong thực tế, cache không nhanh hơn thanh ghi (register) nhưng nhanh hơn nhiều khi so với bộ nhớ chính ( main memory). Để truy cập dữ liệu từ bộ nhớ chính sẽ tốn nhiều thời gian, vậy nên để giảm quá trình này một vùng nhớ đặc biệt trong CPU sẽ được dành riêng chứa một lượng nhỏ dữ liệu cần thiết. Khi một tiến trình muốn tiếp cận lượng dữ liệu trên, đầu tiên nó sẽ kiểm tra trong cache, nếu tìm thấy thì lấy ra và chế biến, nếu không nó mới đi tiếp tới bộ nhớ chính.

Cache phải tuân thủ theo <b>replacement policy</b> khi dung lượng vượt quá giới hạn:
<ul>
    <li>-  Quyết định được dữ liệu nào cần loại bỏ.</li>
    <li>-  Tối thiếu được số lượng cache misses. </li>
    <li>-  Chi phí thấp. </li>
</ul>

Có rất nhiều thuật toán implement cache, trong đó có 2 thuật toán đơn giản là <b>Least Recently Used</b> và<b> Least Frequently Used</b> được sử dụng rộng rãi. Và cũng là 2 thuật toán tôi muốn giới thiệu trong bài viết này.

<h3><b> Least Recently Used </b></h3>
Thuật toán này lấy thời gian lần cuối sử dụng object để quyết định có loại bỏ hay không?. Cụ thể, nó sẽ xóa object có thời điểm được sử dụng gần nhất cách thời điểm hiện tại xa nhất khỏi bộ nhớ khi bộ chứa đạt tới giới hạn. Một object vừa được truy cập sẽ được đẩy vào cache hoặc ghi đè thời gian sử dụng nếu đã nằm sẵn trong cache.

> <p style="font-size:16px;text-align:center">Ví dụ: Bạn có một tủ chật kín quần áo và cần bỏ đi vài cái để sắm quần áo mới. Lúc này bạn sẽ loại đi những bộ quần áo mà lần gần nhất bạn mặc cách đây lâu nhất. Để giả định này đúng, do uống trà sữa quá nhiều nên tăng cân, bạn không thể mặc những bộ quần áo cũ mặc dù rất đẹp. Lần cuối mặc nó là lúc chưa tăng cân.</p>


<h5> <u>Phân tích cấu trúc dữ liệu:</u></h5>

<br>
Để implement được LRU, cần có một data structure đảm bảo được:

<table style="border-collapse: collapse;">
  <tr >
    <th style="border: 1px solid black;  text-align: left; padding:5px; width:50%">Yêu cầu</th>
    <th style="border: 1px solid black;  text-align: left; padding:5px;">Data structure</th>
    <th style="border: 1px solid black;  text-align: left; padding:5px;">Chi phí độ phức tạp</th>
  </tr>
  <tr>
    <td style="border: 1px solid black;  text-align: left; padding:5px; width:50%">Tìm kiếm</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">HashMap hoặc HashTable.</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">O(1)</td>
  </tr>
  <tr>
    <td style="border: 1px solid black;  text-align: left; padding:5px; width:50%">Thêm mới một object</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">Static array, linked list, Hashmap ( HashTable ) với tỉ lệ collision thấp. </td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">O(1)</td>
  </tr>
  <tr>
    <td rowspan="2" style="border: 1px solid black;  text-align: left; padding:5px; width:50%">Xóa object gần nhất sử dụng cách hiện tại xa nhất.</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">Double Linked list được sắp xếp theo thời gian gần nhất sử dụng tăng dần.</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">O(1)</td>
  </tr>
   <tr>
    <td style="border: 1px solid black;  text-align: left; padding:5px;" >Hàng đợi ưu tiên ( Priority queue). Cụ thể là Min-heap với key là thời gian gần nhất truy cập của object. </td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">O(logn)</td>
  </tr>
  <tr>
    <td rowspan="2" style="border: 1px solid black;  text-align: left; padding:5px; width:50%">Khi một object đã có trong cache được truy cập thì sẽ ghi đè thời điểm hiện tại vào cache. Đồng thời vẫn đảm bảo vị trí các object theo chiều tăng dần thời gian.</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;" >Sử dụng HashMap(HashTable) cho tìm kiếm O(1). Với double linked list thì xóa O(1). Sau đó thêm mới object với thời gian hiện tại là O(1).  </td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">O(1)</td>
  </tr>
   <tr>
    <td style="border: 1px solid black;  text-align: left; padding:5px;" >Min-heap như trên. Để đảm bảo tính đúng của Min_heap thì sử dụng heapify cho ta O(logn). </td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">O(logn)</td>
  </tr>
</table>
<br>
Với bảng phân tích như trên chúng ta dễ dàng chọn được cấu trúc dữ liệu thích hợp và tốt nhất để xây dựng LRU là : <b>HashMap</b> và<b> Double Linked List</b>.

<h5> <u>Implement LRU:</u></h5>
<p><b>LRU node </b>chứa dữ liệu, thời gian sử dụng và 2 con trỏ tới các node khác.</p>
<p><b>Hash Map</b> giữ key và LRU node tương ứng.</p>
<p><b>Double Linked List</b> lưu head là node chứa dữ liệu có thời gian sử dụng cuối cùng xa nhất. Ngược lại, tail sẽ lưu node được sử dụng gần đầy nhất.</p>
<br>
 ![Complicated process](/assets/img/blog/content/lru-1.png)
<br><br>

<h5> <u>Coding LRU:</u></h5>
<b>LRU Node</b>
<br>
 ![Complicated process](/assets/img/blog/content/lru-code1.png)
<br><br>
<b>Double Linked List</b>
<br>
 ![Complicated process](/assets/img/blog/content/lru-code2.png)
![Complicated process](/assets/img/blog/content/lru-code3.PNG)

<h5> <u>Đánh giá với implement bằng priority heap:</u></h5>
Sử dụng thư viện <b>cProfile</b> để đánh giá hiệu năng.<br>
Cache chứa được 2048 phần tử, giá trị random từ 1 đến 5000, 100000 hành động put và 1000 hành động get.
<br>
![Complicated process](/assets/img/blog/content/lru-compare.PNG)
<br><br>
<u>HashTable + Double Linked List:</u>
<br>
<br>
![Complicated process](/assets/img/blog/content/lru-compare1.PNG)
<br><br>
<u>Priority Heap:</u>
<br>
<br>
![Complicated process](/assets/img/blog/content/lru-compare2.PNG)
<p> Bỏ thời gian thực hiện random một giá trị cho phần test và các hàm khởi tạo khác. Để khách quan, chúng ta không xét thời gian của hàm tìm kiếm vì với heap sẽ có O(n) ( vì giá trị tìm kiếm không phải là giá trị xây dựng heap ), mà chỉ so sánh thời gian thực hiện hàm xóa và duy trì tính đúng của heap.</p>
<table style="border-collapse: collapse;">
  <tr >
    <th style="border: 1px solid black;  text-align: left; padding:5px; width:50%">Action</th>
    <th style="border: 1px solid black;  text-align: left; padding:5px;">Double Linked List + Hash map</th>
    <th style="border: 1px solid black;  text-align: left; padding:5px;">Priority Heap</th>
  </tr>
  <tr>
    <td style="border: 1px solid black;  text-align: left; padding:5px; width:50%">removeNode + Heapify(for Heap)</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">0.21</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">3.216</td>
  </tr>
  <tr>
    <td style="border: 1px solid black;  text-align: left; padding:5px; width:50%">updateNode + Heapify(for Heap)</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">1.24 </td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">0.639</td>
  </tr>
  <tr>
    <td style="border: 1px solid black;  text-align: left; padding:5px; width:50%">addNode</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">0.02</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">0.008</td>
  </tr>
   <tr>
    <td style="border: 1px solid black;  text-align: left; padding:5px; width:50%">Heapify</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">0</td>
    <td style="border: 1px solid black;  text-align: left; padding:5px;">3.670</td>
  </tr>
</table>
<br>
Heapify có độc phức tạp là O(logn). Vậy nên khi so sánh update và remove với HashMap + Double Linked List có O(1) thì thời gian chênh nhau khá lớn. Chỉ tính riêng Heapify đã chiếm thời gian nhiều nhất. Ở bài tiếp theo tôi sẽ giới thiệu <b> Least Frequently Used</b>.