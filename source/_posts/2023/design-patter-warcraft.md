---
title: design-patter-warcraft
tags:
  - 1
  - 2
hidden: true
abbrlink: b268e5b9
date: 2023-10-01 02:14:35
catagories:
categories:
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->

这 23 种设计模式，分别是：

Creational Patterns (创建型模式)

> 不是直接实例化对象，而是通过其他的方式来创建对象，这样可以让程序更加灵活的决定哪些对象需要被创建。

- Abstract factory (抽象工厂模式) 将具有相同主题的对象工厂分组。( groups object factories that have a common theme.)

Builder constructs complex objects by separating construction and representation.

- Builder (建造者模式) 将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。( separates object construction from its representation)

Factory method creates objects without specifying the exact class to create.
Prototype creates objects by cloning an existing object.
Singleton restricts object creation for a class to only one instance.
Structural
Structural patterns concern class and object composition. They use inheritance to compose interfaces and define ways to compose objects to obtain new functionality.

Adapter allows classes with incompatible interfaces to work together by wrapping its own interface around that of an already existing class.
Bridge decouples an abstraction from its implementation so that the two can vary independently.
Composite composes zero-or-more similar objects so that they can be manipulated as one object.
Decorator dynamically adds/overrides behaviour in an existing method of an object.
Facade provides a simplified interface to a large body of code.
Flyweight reduces the cost of creating and manipulating a large number of similar objects.
Proxy provides a placeholder for another object to control access, reduce cost, and reduce complexity.
Behavioral
Most behavioral design patterns are specifically concerned with communication between objects.

Chain of responsibility delegates commands to a chain of processing objects.
Command creates objects that encapsulate actions and parameters.
Interpreter implements a specialized language.
Iterator accesses the elements of an object sequentially without exposing its underlying representation.
Mediator allows loose coupling between classes by being the only class that has detailed knowledge of their methods.
Memento provides the ability to restore an object to its previous state (undo).
Observer is a publish/subscribe pattern, which allows a number of observer objects to see an event.
State allows an object to alter its behavior when its internal state changes.
Strategy allows one of a family of algorithms to be selected on-the-fly at runtime.
Template method defines the skeleton of an algorithm as an abstract class, allowing its subclasses to provide concrete behavior.
Visitor separates an algorithm from an object structure by moving the hierarchy of methods into one object.
Reception
In 2005 the ACM SIGPLAN awarded that year's Programming Languages Achievement Award to the authors, in recognition of the impact of their work "on programming practice and programming language design".[3]

Criticism has been directed at the concept of software design patterns generally, and at Design Patterns specifically. A primary criticism of Design Patterns is that its patterns are simply workarounds for missing features in C++, replacing elegant abstract features with lengthy concrete patterns, essentially becoming a "human compiler". Paul Graham wrote:[4]

When I see patterns in my programs, I consider it a sign of trouble. The shape of a program should reflect only the problem it needs to solve. Any other regularity in the code is a sign, to me at least, that I'm using abstractions that aren't powerful enough-- often that I'm generating by hand the expansions of some macro that I need to write.

Peter Norvig demonstrates that 16 out of the 23 patterns in Design Patterns are simplified or eliminated by language features in Lisp or Dylan.[5] Related observations were made by Hannemann and Kiczales who implemented several of the 23 design patterns using an aspect-oriented programming language (AspectJ) and showed that code-level dependencies were removed from the implementations of 17 of the 23 design patterns and that aspect-oriented programming could simplify the implementations of design patterns.[6]

There has also been humorous criticism, such as a show trial at OOPSLA '99 on 3 November 1999,[7][8][a] and a parody of the format, by Jim Coplien, entitled "Kansas City Air Conditioner".

In an interview with InformIT in 2009, Erich Gamma stated that the book authors had a discussion in 2005 on how they would have refactored the book and concluded that they would have recategorized some patterns and added a few additional ones, such as extension object/interface, dependency injection, type object, and null object. Gamma wanted to remove the Singleton pattern, but there was no consensus among the authors to do so.[9]
