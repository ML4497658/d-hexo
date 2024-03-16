---
title: CS好课可以改变废柴命运吗？
tags:
    - CS
    - SICP
    - 感受
hidden: false
abbrlink: 42f74a3c
date: 2023-12-16 12:14:15
catagories:
categories:
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->

SICP，大名鼎鼎的 CS 神课，狭义上指的是 MIT 6.001 课程以及同源的巫师书，要是宽泛点也能够指 UC Berkeley 的 CS61A 课程。

所谓 CS 神课，属于那种 `早学到这课我还会混成这 dio 样？` 的灵丹妙药，相当一部分人接触到的时候都会有这样的惊叹，我也不例外，有那么一瞬间甚至觉得，所谓 Computer Science 似乎也不过如此的错觉

可惜，当我抽出时间来的时候，已经过了入门阶段了，怎奈这门课好评如潮，不免心动，于是来了一遍速通，做了做 hw、lab 和 project，质量相当的高

做完之后，意犹未尽，于是向真正的 SICP 进发，开始看《计算机程序的构造和解释》(Structure and Interpretation of Computer Programs，SICP) 作者是麻省理工学院教授哈尔·阿伯尔森和杰拉德·杰伊·萨斯曼

我得承认，虽然我在读的时候止不住的吐槽翻译很差劲，但当我转而去 MIT 官网上 down 下原版 PDF 的时候，还是不禁叹道:

> 这 tm 和 CS61A 好像不是一个难度的啊？

总之，这本原典一巴掌把我从速通完 CS61A 的惬意中抽醒，使我不得不陷入对人生的思考————好在当年的 MIT 6.001 在网络上有完整的录像，我于是转而看视频，两位讲师上课都非常的有趣

## 回到 1986

Hal 以 Computer Science "不是一个好的名字" 开始了这门课

> It ain't about computer, it's even not a kind of science, it's more lika a kind of art

当古埃及人发明几何学 (Geometry) 的时候，它们将其命名为 "大地测量"，因为它们用这个学科的知识来测量土地等，但是，当我们从现在往回看的时候，我们惊呼： Gee！你看他们发现了多么伟大的东西

或许在几百年之后，未来的人会说，看这些 20 世纪的土著起了个什么名字，他们发现了 Computer Science，却只是埋头折腾 Computer 的使用

实际上，在一门学科刚刚诞生之时，我们很容易混淆所做的事与所用之物

几何学之所以强大，不是因为能够用来丈量土地，而是给予了我们对时间和空间进行形式化表达，直接导致了公理化表达和现代数学的产生

Computer Science 或许给予了我们除了数学 "What is" 的陈述性知识之外，给我们 "How to" 的能力 -- 将计算过程进行形式化表达

比如说，数学会告诉你平方根的定义，Computer Science 会给你一个算法来求得它

当然，CS 不只是如何求平方根，它更给我们一种在大系统中控制复杂度的技术

...

这里仅仅是截取了第一讲开头五分钟的 Intro，相当精彩，虽然我的转述可能有点烂hh

## 构建复杂系统

Lec4-B，运用了模式匹配、运算符抽象(挺像重载)、数据类型的 dispatch table等构建了一个复杂而通用、可拓展的数字运算系统，这个系统可以处理复数、有理数、多项式等等

非常优雅，很好的展示了程序设计的艺术，很好的体现了"在大系统中控制复杂度的技术"

"我们要用机器和自动化取代掉 manager 存在的意义"

所以，这个系统的不灵活性，也就是需要做一些工作来适应变化的地方，就在于管理者，这是相当令人恼火的。更令人恼火的是，当你意识到管理者并没有做什么的时候。管理者只是一个文书工作者。

让我们再看看这些程序。它们在做什么？

real-part 说，哦，这是乔治能处理的复数吗？ 如果是，就把它发给乔治。 这是玛莎能处理的复数吗？ 如果是，就把它发给玛莎。

So it's really annoying that the bottleneck in this system, the thing that's preventing flexibility and change, is completely in the bureaucracy. It's not in anybody who's doing any of the work.

Not an uncommon situation, unfortunately.

上世纪 80 年代的美国人也吐槽 Bureaucracy

## 引入可变数据

如果你不引入赋值、状态、副作用，那么你就可以得到一个简单的、优雅的、可靠的程序，就像数学一样，函数就像两个集合之间的映射，输入相同，输出也相同

在Lec5-A，Professor Sussman 说，我们不得不引入一些副作用

> So as I said, first we need a new model of computation, and second, we have to be damn good reason for doing this kind of ugly things.

## Maybe Time is Just An Illusion

Well,或许我们之所以要付出如此巨大的代价来写程序，不是计算机的问题，而是我们对现实的错误看法

> See, maybe time is just an illusion, and nothing ever changes.

See 看这个粉笔，如果我扔出去，然后我们说，这是个物体，它有一个状态。在每个时刻它有一个位置和一个速度。如果我们做一些事情，那个状态就会改变。

但是，如果你学过相对论，你知道，你不应该把粉笔的路径看成是一个一个的瞬间。

更有见地的是把粉笔的整个存在看成是空间时间中的一条路径。它就是这样展开的。

> There aren't individual positions and velocities.There's just its unchanging existence in space-time.

Lec6 的流相当有趣，我之所以在了解到 CPP20 Ranges 后就像尝试斐波那契数列的惰性生成，其实就是因为 Hal 中间举的那个例子

## 巫师的帽子

我其实迷迷糊糊的大概把这门课看完了，但能理解的充其量也就到 Lec7，黑魔法释放hh，Professor Sussman 甚至真的带上了巫师帽子：

> let's see, normally, people under 40 and who don't have several children are advised to be careful. If they're really worried, they should leave. Because there's a certain amount of mysticism that will appear here which may be disturbing and cause trouble in your minds.

这一节讲的 eval 和 apply 的元循环，让我想起来做 CS61A 的最后一个 project，我也是在这个 project 里面第一次接触到了这个东西，老实说当时做的云里雾里的，啊哈哈

## 旧时代的人工智能泡沫

Lec8 介绍了一门类似 Prolog 的语言，从某些方面来说它有些像 SQL，或者应该反过来说

总之，这不是一个 "How to" 的语言，而是一个似然高级语言 (我不清楚具体的词汇)， 总之这一讲听得我迷迷糊糊的，学期末的各种事情也复杂，我于是也就放弃了后面的两讲

但是由 prolog 可以了解到上世纪的那场 "第五代计算机"的 历史

这里只给出链接

[一场失败的“AI 革命”：回顾第五代计算风潮](https://www.infoq.cn/article/raxwuq3h_xmvjszs57jm)

[深度分析：日本第五代计算机是如何一步步走向失败的！](https://maimai.cn/article/detail?fid=1049718585&efid=LQC1xbp_h--RBm0Gs6YvAQ)

好像 Hal 也提到说他们当年也搞过这个，后来觉得不行就放弃了，给学生们讲 prolog 只是为了教学

## CS 好课可以改变废柴命运吗？

答案显而易见，我现在依然过着不怎么样的生活。但是我觉得我对 CS 的认识更加深刻了，我也更加清楚自己的方向了

> 后面半句是 copilot 给我加的
