---
title: CPP20 Ranges与斐波那契数列的惰性生成
tags:
  - cpp
  - C++20
  - C++Ranges
hidden: false
catagories: 技术
abbrlink: 3535f2b5
date: 2023-12-24 15:32:59
top_img:
cover:
---

<meting-js
    server="netease"
    type="song"
    autoplay="false"
    id="1496089151">
</meting-js>

C++ 20 中引入了 [Ranges](https://en.cppreference.com/w/cpp/ranges) 模块, 该模块提供了一系列的range view, 用于对容器进行操作, 本文将使用`Ranges`来实现惰性生成斐波那契数列.

## 在开始之前

让我们写一个十分简单的递归函数，用于生成斐波那契数列:

```cpp
auto fibo_rec(int n) {
    if (n <= 1) {
      return 1;
    } else {
      return fibo_rec(n - 1) + fibo_rec(n - 2);
    }
}

int main() {
    for (int i = 0; i < 10; ++i) {
        std::cout << fibo_rec(i) << " ";
    }
    std::cout << std::endl;
}
```

这时，一定会有小伙伴迫不及待地想要说，这个递归函数的效率太低了，而且还有可能会导致栈溢出，并且熟练给出一个更高效的循环实现

```cpp
auto a = 0, b = 1;
for (int i = 0; i < 10; ++i) {
    std::cout << b << " ";
    std::tie(a, b) = std::make_tuple(b, a + b);
}
```

而喜欢尾递归的同学则会对这种命令式的实现感到不满，并且给出一个尾递归的迭代实现

```cpp
template <std::integral T>
auto fib_rec = [](int n) -> T {
    std::function<T(T, T,int)> fib_helper = [&](T prev, T curr, int n) -> T {
        return (n == 1) ? curr : fib_helper(curr, prev + curr, n - 1);
    };
    return fib_helper(0, 1, n);
};

int main() {
    for (int i = 0; i < 10; ++i) {
        std::cout << fib_rec<int>(i) << " ";
    }
    std::cout << std::endl;
}
```

然而，如果只是改为尾递归的话，我们不过是 (在编译器开启尾递归优化,Tail Call Optimization) 将递归转化为了循环，防止了栈溢出，但是还是没有解决效率低的问题--每次都要重新计算前面的值

这时，就会有一个声音喊道，我们可以建个表，把前面的值都存起来，这样就不用每次都重新计算了，更有使用编译器计算来打表的神奇技巧。

```cpp
template <int n>
struct Fib {
    static constexpr int val = Fib<n - 1>::val + Fib<n - 2>::val;
};

template<> struct Fib<0> { static constexpr int val = 1; };
template<> struct Fib<1> { static constexpr int val = 1; };

template <int... Is>
constexpr auto generateFibonacciArray(std::integer_sequence<int, Is...>) {
    return std::array<int, sizeof...(Is)>{Fib<Is>::val...};
}

int main()
{
    constexpr auto fibonacciArray = generateFibonacciArray(std::make_integer_sequence<int, 10>());

    for (int value : fibonacciArray) {
        std::cout << value << " ";
    }
    std::cout <<  std::endl;
    return 0;
}
```

我们可以在编译期计算 10 个斐波那契数，我们可以在编译期计算 100 个斐波那契数，但是我们可以在编译期间计算 **无限个** 斐波那契数吗？即使我们能容忍编译时间的增加，但是我们的空间能容纳下吗？

让我们回到最初的问题，实现一个斐波那契数列

如果我们用 python 来实现的话，会是什么样子呢？

```python
def fibo_generator():
    a, b = 0, 1
    while True:
        yield b
        a, b = b, a + b

fibo = fibo_generator()
for i in range(10):
    print(next(fibo), end=" ")
print()    
```

非常简洁，非常的 `pythonic`，我们可以看到，python 中的生成器是惰性的，只有在需要的时候才会计算，而且不会重复计算，避免了重复计算的问题，而且还可以无限生成，这是我们之前的实现所不能做到的

好吧，C++ 23 标准新引入的 [generator](https://en.cppreference.com/w/cpp/header/generator) 就可以实现这个功能

```cpp
#include <iostream>
#include <generator>
#include <ranges>

std::generator<int> fib_generator() {
  int a = 0, b = 1;
  for (;;) {
    std::tie(a, b) = std::make_tuple(b, a + b);
    co_yield a;
  }
}

int main() {
  auto fibonacci = fib_generator() | std::views::take(6);
  for (auto i : fibonacci) {
    std::cout << i << ' ';
  }
  std::cout << std::endl;
}
```

现在是 2023 年 12 月 24 日，虽然 `gcc-trunk` 已经支持了这个特性，但还没有正式的 release

## 什么是 Ranges

Ranges 库是算法和迭代器库的扩展和泛化, 通过使它们可组合和减少错误, 使它们更加强大

换言之, Range 是一个概念而非一个具体的类型, 一个 Range 是一个能够提供迭代器的对象, 该迭代器能够遍历该对象的元素, 例如, 一个`std::vector`就是一个 Range, 因为它提供了`begin()`和`end()`方法, 而这两个方法返回的迭代器能够遍历该`std::vector`的元素.

> If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.

正如上面的格言所说, 如果一个对象有一个`begin()`方法和一个`end()`方法, 并且这两个方法返回的迭代器能够遍历该对象的元素, 那么这个对象就可以是一个 Range.

这个库创建和操作 range view, 轻量级的对象, 间接地表示可迭代的序列 (range). Range 是对迭代器对的抽象,

- `[begin, end)`- 迭代器对, 例如, 通过从容器进行隐式转换而生成的 range. 所有接受迭代器对的算法现在都有接受 range 的重载 (例如, ranges::sort)
- `begin + [0, size)` - 计数序列, 例如, 通过 views::counted 返回的 range
- `[begin, predicate)` - 有条件终止的序列, 例如, 通过 views::take_while 返回的 range
- `[begin, ..)` - 无界序列, 例如, 通过 views::iota 返回的 range

Ranges 库包括 range 算法, 这些算法会被急切地应用到 range 上, 以及 range 适配器, 这些适配器会被惰性地应用到 view 上. 适配器可以被组合成 pipeline, 以便它们的操作在 view 被迭代时发生.

## 从第四个斐波那契数开始

我们之前的例子都是从第一个斐波那契数开始的, 如果我们想从第四个斐波那契数开始呢?答案是简单的，我们更改一下调用函数的参数即可

```cpp
for (int i = 0; i < 10; ++i) {
    std::cout << fibo_rec(i + 3) << " ";
}
```

诶，等一下，还记得命令式的那个方法吗？

```cpp
auto a = 0, b = 1;
for (int i = 0; i < 10; ++i) {
    std::cout << b << " ";
    std::tie(a, b) = std::make_tuple(b, a + b);
}
```

如果我们想要从第四个斐波那契数开始，我们就需要做一些小小的改动

```cpp
auto a = 0, b = 1;
int begin_with = 4;
int took =10;
for (int i = 0; i < begin_with + took; ++i) {
    if (i < begin_with){
        std::tie(a, b) = std::make_tuple(b, a + b);
    } else {
        std::cout << b << " ";
        std::tie(a, b) = std::make_tuple(b, a + b);
    }
}
std::cout << "\n";
```

我们不妨加一个 lambda 表达式来简化一下

```cpp
auto fib = [a = 0, b = 1]() mutable {
    std::tie(a, b) = std::make_tuple(b, a + b);
    return a;
};

int begin_with = 4;
int took =10;
for (int i = 1; i < begin_with + took; ++i) {
    if (i < begin_with){
        fib(); // run it, but dont return/execute
    } else {
        std::cout << fib() << " ";
    }
}
std::cout << "\n";
```

一个很自然的想法是，用 `range` 来实现这个功能
  
```cpp
auto fib_generator = []() {
    return [a = 0, b = 1](int _) mutable {
        std::tie(a, b) = std::make_tuple(b, a + b);
        return a;
    };
};
auto fibonacci = std::views::iota(0) | std::views::transform(fib_generator());

for (auto i : fibonacci | std::views::drop(4) | std::views::take(10)) {
    std::cout << i << ' ';
}

std::cout << std::endl;
```

我们尝试借助 `iota` 来构建一个无尽的序列，然后通过 `transform` 来对 `iota` 中的每一个元素进行处理，不过我们忽略了 `iota` 传递给 `transform` 的值，只是自顾自地返回斐波那契数列，然后通过 `drop` 和 `take` 来截取我们想要的部分，然后通过 `for` 循环来遍历这个序列

看起来很棒，对吗？

```bash
> 1 1 2 3 5 8 13 21 34 55
```

结果是悲惨的，我们的程序并未产生正确的输出，而是仍然从第一个斐波那契数开始，这是为什么呢？

## StackOverflow 启动

在长时间的 STFW、RTFM 之后，我终于放弃了像无头苍蝇一样乱撞，而是去 StackOverflow 上提问，然后得到了这样的回答

> [`views::transform`](https://en.cppreference.com/w/cpp/ranges/transform_view) requires the transformation to model the [`std::regular_invocable`](https://en.cppreference.com/w/cpp/concepts/invocable) concept (with relevant argument types).
>
> This concept requires that the transformation does not modify itself and that it is [*equality-preserving*](https://en.cppreference.com/w/cpp/concepts#Equality_preservation), meaning simplified that it gives the same output for same inputs.
>
> Your transformation violates both of these requirements and therefore its use as argument to `views::transform`` has undefined behavior.

好吧，未定义行为，那就已经没有深究的必要了

SICP 里面提到过类似的问题，如果你不引入赋值、状态、副作用，那么你就可以得到一个简单的、优雅的、可靠的程序，就像数学一样，函数就像两个集合之间的映射，输入相同，输出也相同

在Lec5-A，Professor Sussman 说过，我们不得不引入一些副作用

> So as I said, first we need a new model of computation, and second, we have to be damn good reason for doing this kind of ugly things.

a damn good reason, isn't it?

在 SICP 中，之后一个lecture 便开始讲流与延迟求值，而在 C++ 中，我们可以使用 `std::generator` 来实现这个功能，就如同先前的例子一样

额，等等，我们不是要用 `ranges` 来实现这个功能吗？

## 用 Ranges 实现惰性生成斐波那契数列

现在我们已经知道了 `transform` 不能用来实现惰性生成斐波那契数列，那么我们该怎么办呢？

答案是，我们自己创建一个类似于 `iota` 的 lazy ranges

如果是在大名鼎鼎的 `ranges-v3` 中，我们可以简单的实现

```cpp
template <typename T>
struct fibo_generator {
    T a = 0, b = 1;
    T operator()() {
        std::tie(a, b) = std::make_tuple(b, a + b);
        return a;
    }
};

template <typename T>
auto fibonacci = std::views::generate(fibo_generator<T>{});
```

如果是前面提到的 C++23 中的 `generator`，我们可以这样实现

```cpp
std::generator<int> fib_generator() {
  int a = 0, b = 1;
  for (;;) {
    std::tie(a, b) = std::make_tuple(b, a + b);
    co_yield a;
  }
}
auto fibonacci = fib_generator();
```

然而，C++20 中的 `ranges` 并没有提供 `generate` 这个函数...

我们只能自己实现了

```cpp
struct fibonacci_iterator {
 int a = 0;
 int b = 1;

 friend constexpr bool operator==(const fibonacci_iterator&,const fibonacci_iterator&) noexcept = default;

 constexpr int operator*() const noexcept { return b; }

 constexpr fibonacci_iterator& operator++() noexcept {
  std::tie(a,b) = std::make_tuple(b,a+b);
  return *this;
 }

 constexpr fibonacci_iterator operator++(int) noexcept {
  auto copy = *this;
  return copy;
 }
    using value_type = int;
    using difference_type = std::ptrdiff_t;
};

inline constexpr auto fibonacci = std::ranges::subrange(fibonacci_iterator{}, std::unreachable_sentinel);
static_assert(std::ranges::forward_range<decltype(fibonacci)>);
```

调用起来也很简单，这三种实现都可以这样像用 iota 一样使用

```cpp
int main() {
    for (auto i : fibonacci | std::views::drop(4) | std::views::take(6)) {
        std::cout << i << ' ';
    }

    std::cout << std::endl;
}
```

可以看到，实现一个 range 和实现一个 iterator 一样简单，就像 iterator 分为 forward iterator、bidirectional iterator、random access iterator 一样，range 也有不同的类型，例如 forward range、bidirectional range、random access range，我们可以通过 `static_assert` 来检查我们的 range 是否满足某个类型的 range

## 总结

本文介绍了 C++20 中的 Ranges 模块，以及如何使用 Ranges 模块来实现惰性生成斐波那契数列，以及如何实现一个简单的 range

今天是 12 月 24 日，又到了白色相簿的季节，祝大家圣诞快乐

考试周破防 ing

## 参考资料

- [Ranges - cppreference](https://en.cppreference.com/w/cpp/ranges)
- [Ranges: views::transform with stateful lambda - Stackoverflow](https://stackoverflow.com/questions/77708366/unexpected-output-with-lazily-generating-fibonacci-sequence-in-c20-ranges)
- [How would you implement a lazy range factory for C++20 ranges that just calls a function? - Stackoverflow](https://stackoverflow.com/questions/71148130/how-would-you-implement-a-lazy-range-factory-for-c20-ranges-that-just-calls)
- [MIT 6.001 Structure and Interpretation, 1986Lec5-A](https://youtu.be/dO1aqPBJCPg?si=hwIZ5G646zAND4cC)
- [ranges-v3](https://ericniebler.github.io/range-v3/)
- [Quick reference for the Range-v3 library](https://www.walletfox.com/course/quickref_range_v3.php)
