---
title: Win 平台下的 GCC 与 Clang
tags:
  - 1
  - 2
hidden: true
abbrlink: 8722d43e
date: 2023-10-01 02:13:24
catagories:
categories:
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->

## 前置知识

如果你了解了下面这些知识，那么你可以跳过这一节。

点击 [这里](#win-下-gcc-的两大思路) 跳过这一节。

### 什么是 GCC

GCC (GNU Compiler Collection) 是 GNU 开发的编程语言编译器。它是 GNU 项目的关键部分，也是 GNU 工具链的主要组成部分之一。GCC 目前支持的语言包括 C、C++、Objective-C、Fortran、Java、Ada、Go、D 以及各种处理器的汇编语言。

GCC 是自由软件，它的源代码在 GNU 通用公共许可证 (GPL) 下发布。GCC 由自由软件基金会 (FSF) 开发，是 GNU 项目的一部分。

### 什么是 Clang

Clang (C Language Family Frontend for LLVM) 是一个 C、C++、Objective-C 和 Objective-C++ 的编译器前端，它采用 LLVM 作为后端。Clang 是一个自由软件，它以 BSD 许可证授权发布。

> LLVM (Low Level Virtual Machine) 是一个编译器基础设施，它包含了一系列模块化的编译器组件和工具链，用于开发编译器前端和后端。LLVM 项目是一个开源项目，它被许多不同的公司和个人使用，包括 Apple、AMD、ARM、Sony、Intel、Google、NVIDIA、Adobe、Cray 等等。

## Win 下 GCC 的两大思路

众所周知，GCC 是 Linux 下的编译器，想要把它移植到 Win 下，有两种思路：

### MinGW / MinGW-w64 / TDM-GCC / WinLibs

### Cygwin / MSYS / MSYS2

## Win 下 Clang 的两种编译器后端

Win 下的 Clang 有两种编译器后端：

- MSVC
- GCC

## posix、线程模型、ABI 以及其他

当你仔细观察 MinGW 的 Release 的名字，你会发现许多名词，比如 posix、线程模型、ABI 等等。

- MSVCRT 与 POSIX
