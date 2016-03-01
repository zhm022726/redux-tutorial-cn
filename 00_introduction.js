// 章节 0 - introduction.js

// 为什么要有这个教程呢？
// 在我尝试学习 Redux 的时候，我意识到我因为一些文章和个人经验，
// 而积累了一些关于 flux 的错误观念。
// 我不是说那些 flux 的文章写得不好哦，只是我不能正确地理解那些概念。
// 到最后，我只是在应用不同的 flux 框架（Reflux、Flummox、FB Flux）的文档，
// 并且努力去把它们和那些理论性的概念（action/actions creator、store、dispatcher 等等）给联系起来。
// 等我用了 Redux 之后，我才发现原来flux比我想象的要简单很多。
// 这些都归功于 Redux 通过优良的设计来减少样板文件，而其它框架则是为了减少样板文件却又引入了很多新的代码。
// 我现在觉得用通过 Redux 来学习 flux 比通过其他框架高效得多。
// 这就是为什么我想分享给大家，用我自己的话来说，
// 通过关注 Redux 的用法来理解 flux 的概念。

// 你一定已经看过这张著名的 flux 的单向数据流图了。

/*
                 _________               ____________               ___________
                |         |             |            |             |           |
                | Action  |------------▶| Dispatcher |------------▶| callbacks |
                |_________|             |____________|             |___________|
                     ▲                                                   |
                     |                                                   |
                     |                                                   |
 _________       ____|_____                                          ____▼____
|         |◀----|  Action  |                                        |         |
| Web API |     | Creators |                                        |  Store  |
|_________|----▶|__________|                                        |_________|
                     ▲                                                   |
                     |                                                   |
                 ____|________           ____________                ____▼____
                |   User       |         |   React   |              | Change  |
                | interactions |◀--------|   Views   |◀-------------| events  |
                |______________|         |___________|              |_________|

*/

// 在这个教程里，我们会一步步地向你介绍上图里的各个概念。 
// 我们会把这些概念分成单独的章节来介绍它们存在的意义和作用，
// 而不会笼统地介绍整张数据流图。
// 在最后，当我们理解了每一个概念后，我们会发现这张图真是意义深远啊！

// 在我们开始之前，我们先聊下一flux存在的意义以及我们为什么需要它。
// 假设我们正在构建一个网站应用，那么这个网站应用会由什么组成呢？
// 1) 模板/HTML = View
// 2) 填充视图的数据 = Model
// 3) 获取数据，将所有视图组装在一起，
//    用户事件数据变化时的响应，等等的逻辑 = Controller

// 这就是个非常典型的 MVC，而且它和flux的概念看起来很像的，
// 只是在某些表述上有些小小的不同：
// - Model 看起来像 Store
// - 用户事件、数据变化以及它们的处理程序看起来像
//   "action creators" -> action -> dispatcher -> callback
// - View 看起来像 React views (或者其他什么的)

// 所以，flux 就只是一个新名词么？不全是，但是新名词是很重要的，
// 因为通过引入这些新术语我们可以更准确地表述各种专业术语。
// 举一个例子，获取数据是一个 action，一个点击是一个 action，
// 一个input变化也是一个action等等。我们都已经习惯了从我们的应用里分发 action，
// 只是以不同的方式称呼它们。 不同于直接修改 Model 和 View，
// Flux 确保所有 action 首先通过一个dispatcher，
// 然后再是store，最后通知所有的store观测者。

// 为了弄清楚MVC和flux的不同，
// 我们举一个典型的MVC应用的用例：
// 一个典型的MVC应用的流程大致上是这样的：
// 1) 用户点击按钮“A”
// 2) 点击按钮“A”的处理程序触发 Model “A”的改变
// 3) Model “A”的改变处理程序触发 Model “B”的改变
// 4) Model “B”的改变处理程序触发 View “B”的改变并重新渲染自身

// 在这样的一个环境里，当应用出错的时候快速地定位 bug 来源是一件非常困难的事情。
// 这是因为每个 View 可以监视任何的 Model，
// 并且每个 Model 可以监视其它所有 Model，所以数据会从四面八方涌来，并且被许多源（view 或者 model）改变。

// 当我们用 flux 以及它的单向数据流的时候，上面的例子就会变成这样子：
// 1) 用户点击按钮“A”
// 2) 点击按钮“A”的处理程序会触发一个被分发的 action，并改变 Store “A”
// 3) 因为其它的 Store 也被这个 action 通知了，所以 Store “B”也会对相同的 action 做出反应
// 4) View “B”因为 Store  A 和 Store B的改变而收到通知，并重新渲染

// 来看一下我们是如何避免 Store A 和 Store B 直接相关联的。 
// 每一个 Store 只能被一个 action 修改，别无他选。
// 并且当所有 Store 回应了 action 后，最终所有 View 都会更新。由此可见，数据总是沿一个方向进行流动：
//     action -> store -> view -> action -> store -> view -> action -> ...

// 就像我们从一个 action 开始我们的用例，
// 让我们以 action 和 action creator 来开始我们的教程。

// 进入到下一个教程：01_simple-action-creator.js
