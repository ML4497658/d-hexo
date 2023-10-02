---
title: C 和指针 < C and Pointer > 快速上手
hidden: false
abbrlink: f0934fbe
date: 2022-09-19 20:51:12
tags: C
categories: 读书笔记
---

让我们来分析一下 ***C and Pointer***  这本书的第一章 `快速上手` 所给出的一个例子。

这个例子是一个简单的程序，它从标准输入中读取输入行并在标准输出中打印这些输入行，每个输入行的后面一行是该行内容的一部分。

## 让我们从 main 函数开始

输入的第一行是一串列标号，串的最后以一个负数结尾，这些列标号成对出现，说明需要打印的输入行的列的范围

```` C
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define MAX_COLS 20         /* 所能处理的最大列号*/
#define MAX_INPUT 1000      /*每个输入行的最大长度*/
int read_column_numbers(int columns[] , int max);
void rearrange(char *output, char const *input, int n_columns , int const columns[]);
int main(void){
    int n_columns; /* 进行处理的列标号 */
    int columns[MAX_COLS]; /*需要处理的列号*/
    char input[MAX_INPUT]; /* 容纳输入行的数组 */
    char output[MAX_INPUT];/* 容纳输出行的数组*/
    printf("4 9 12 20 -1 \n");
    
    // 读取该串列标号
    n_columns = read_column_numbers(columns,MAX_COLS);
    
    // 读取、处理和打印剩余的输入行。
    while (gets(input) != NULL)
    {
        printf("Original input: %s\n" , input);
        rearrange(output, input, n_columns, columns);
        printf("Rearranged line: %s\n",output);
    }
    return EXIT_SUCCESS;
}
````

### 注意到 `#define` 的使用了吗？

`#define` 是一个预处理器指令，它的作用是用后面的字符串替换前面的字符串。

`#define MAX_COLS 20` 的作用是将 `MAX_COLS` 替换为 `20`。

`#define MAX_INPUT 1000` 的作用是将 `MAX_INPUT` 替换为 `1000`。

这样做的好处是，如果我们需要修改 `MAX_COLS` 或者 `MAX_INPUT` 的值，我们只需要修改 `#define` 的值即可，而不需要修改每一个使用到 `MAX_COLS` 或者 `MAX_INPUT` 的地方。

这些一般被称为 `宏定义`。如果观察 `main` 函数的结尾，我们会发现 `return EXIT_SUCCESS;`，这里的 `EXIT_SUCCESS` 也是一个宏定义，它的值是 `0`。

### 函数声明 make 代码 prettier

我们在 `main` 函数中调用了 `read_column_numbers` 函数，但是在 `main` 函数之前，我们并没有看到 `read_column_numbers` 函数的实现，相反，我们只是声明，存在一个叫做 `read_column_numbers` 的函数，它的返回值是 `int`，它的参数是 `int columns[]` 和 `int max`。

这样做的好处是，代码更加美观，更加易读。nice！一打开代码，就可以看到整个程序的结构，而不需要翻阅过长长的定义函数的实现才能找到 `main` 函数。

## 让我们再来看看 `read_column_numbers` 函数 的实现

```` C
// 读取列标号，如果超出规定范围则不予理会。
int read_column_numbers(int columns[],int max)
{
    int num = 0;
    int ch;
    
    // 取得列标号，如果所读取的数小于 0 则停止
    while(num < max && scanf("%d", &columns[num]) == 1 && columns[num] >= 0)
    {
        num += 1;
    }   
    
    // 确认已经读取的标号为偶数个，因为它们是以对的形式出现的。
    if(num % 2 != 0)
    {
        puts("Last column number is not paired.");
        exit(EXIT_FAILURE);
    }
    
    // 丢弃该行中包含最后一个数字的那部分内容。 
    while ((ch = getchar()) != EOF && ch != '\n' )
    {
        return num;
    }
}
````

### 注意到 `exit` 的使用了吗？

`exit` 是一个库函数，它的作用是终止当前正在运行的程序，并返回一个指定的值。

`exit(EXIT_FAILURE)` 的作用是终止当前正在运行的程序，并返回一个 `EXIT_FAILURE` 的值，`EXIT_FAILURE` 的值是 `1`。

当我们的程序在终端运行时，如果程序运行成功，它会返回 `0`，如果程序运行失败，它会返回 `1`。

### `getchar` 和 `EOF`

`getchar` 是一个库函数，它的作用是从标准输入中读取一个字符，并返回这个字符。

`EOF` 是一个宏定义，它的值是 `-1`，它的作用是判断是否到达文件的结尾。

`while ((ch = getchar()) != EOF && ch != '\n' )` 的作用是，当 `ch` 不等于 `EOF` 并且 `ch` 不等于 `\n` 时，执行循环体。

为什么要判断 `ch` 是否等于 `\n` 呢？这里要提到 C 语言中的 `缓冲区` 的概念。

当我们在终端输入一个字符时，这个字符并不会立即被程序读取，而是会先被存储在 `缓冲区` 中，当我们按下回车键时，这个字符才会被程序读取。而回车键 `\n` 也会被存储在 `缓冲区` 中。

这也就是说，`\n` 代表着一行的结束，当我们读取到 `\n` 时，我们就可以认为这一行的输入结束了。

与之相似的，C 风格字符串的结尾以 `\0` 结尾的，当我们读取到 `\0` 时，我们就可以认为这个字符串的输入结束了。

那么，`EOF` 代表着文件的结尾，和输入有什么关系呢？这里要提到 `stdin` 和 `stdout`，实际上，标准输入可以有很多种，比如键盘，比如文件，比如网络，而标准输出也可以有很多种，比如屏幕，比如文件，甚至是... 打印机。

## 让我们再来看看 `rearrange` 函数的实现

```` C
 // 处理输入行，将指定列的字符连接在一起，输出行以NUL结尾。
void rearrange( char *output , char const *input , int n_columns , int const columns[])
{
    int col; /*columns 数组的下标*/
    int output_col; /*输出列计数器*/
    int len ; /* 输入行的长度 */
    len = strlen(input);
    output_col = 0;
    /* 
    ** 处理每对列标号
    */
    for(col = 0; col < n_columns; col += 2)
    {
        int nchars = columns[col + 1] - columns[col] + 1;
        /*
        ** 如果输出行结束或输出行数组已满,就结束任务.
        */    
        if (columns[col] >= len || output_col == MAX_INPUT - 1)
        {
            break;
        }

        // 如果输出行组空间不够,只复制可以容纳的数据.
        if (output_col + nchars > MAX_INPUT - 1)
        {
            nchars = MAX_INPUT - output_col -1;
        }
        
        //  复制相关的数据.
        strncpy( output + output_col , input + columns[col] , nchars );
        output_col += nchars;
    }
    output[output_col] = '\0';   
/*
** Right now is 20:48,17th Sep 2022,
** THIS PROGRAME FINNALY RUNS successfully.
*/
}
````

### `strncpy` 的使用以及 `string.h` 头文件

`strncpy` 是一个库函数，它的作用是将 `src` 指向的字符串的前 `n` 个字符复制到 `dest` 指向的字符串中。

`string.h` 是一个头文件，它的作用是包含了一些字符串处理的函数，这里的字符串又被称为 `C 风格字符串`，它的结尾以 `\0` 结尾。

## 总结

这便是 ***C and Pointer***  这本书的第一章 `快速上手` 的一个、、例子，这个例子很简单，但是它却运用到了 C 语言的大多数知识点，这里只是选择性的介绍了一些细枝末节，如果你想要了解更多，我非常推荐你阅读这本书。

P.S. 这本 《C 和指针》 (***C and Pointer ***) 与 《C 陷阱与缺陷》 (*** C Traps and Pitfalls ***) 和 《C 专家编程》 (*** Expert C Programming***) 并称为 C 语言三剑客。

话说，这种对于程序书籍的特殊称呼，比如 K&R (***The C Programming Language***)，GoF (***Design Patterns: Elements of Reusable Object-Oriented Software***)，TAOCP (***The Art of Computer Programming***)，这种称呼，是不是很有意思呢？或许，这也是一种 `程序员的浪漫` 吧。我可能会在以后的文章中，对这种称呼进行一些探讨。
