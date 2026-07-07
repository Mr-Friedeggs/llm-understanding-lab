const icons = {
  check:
    '<svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m9.2 16.6-4-4 1.4-1.4 2.6 2.6 8.2-8.2L18.8 7 9.2 16.6Z"/></svg>',
  next:
    '<svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.4 5.6 19.8 12l-6.4 6.4-1.4-1.4 4-4H4v-2h12l-4-4 1.4-1.4Z"/></svg>',
  back:
    '<svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m10.6 5.6 1.4 1.4-4 4h12v2H8l4 4-1.4 1.4L4.2 12l6.4-6.4Z"/></svg>',
  clear:
    '<svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 6h10V4h2v2h3v2h-2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H2V6h3V4h2v2Zm-1 2v11h12V8H6Zm3 2h2v7H9v-7Zm4 0h2v7h-2v-7Z"/></svg>',
  restart:
    '<svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 7.4a7 7 0 1 1-1.1 8.4l1.7-1a5 5 0 1 0 .8-6l2.1 2.1H4.2V4.4l3 3Z"/></svg>',
  search:
    '<svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 4a6.5 6.5 0 0 1 5.1 10.5l4 4-1.4 1.4-4-4A6.5 6.5 0 1 1 10.5 4Zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"/></svg>',
};

const levels = [
  {
    id: "intro",
    concept: "说明",
    title: "开始前先叠个甲",
    mapTitle: "引言",
    mapHint: "先说明边界",
    meter: 0,
    machineMode: "简化理解路线",
    machinePulse: "先建立直觉，再看细节",
    teachLine:
      "这里会多用打比方的方式，把抽象概念说得更容易理解。",
    coachNote:
      "作者本身也在学习，所以这里会优先讲直觉和比喻；真正做工程或研究时，仍然要回到官方文档、论文和实验结果。",
    inputHint: "好奇心",
    outputHint: "能讲给别人听",
    riskHint: "简化不等于完整",
    challenge:
      "先带着几个问题往下看：文字怎么变成数字？模型为什么逐词生成？注意力到底在注意什么？为什么还要接资料？",
  },
  {
    id: "token",
    concept: "Token",
    title: "模块一：文本如何变成向量",
    mapTitle: "从文字到向量",
    mapHint: "token 先变成向量",
    meter: 25,
    machineMode: "Embedding 进入模型",
    machinePulse: "正在把 token id 查成向量",
    teachLine:
      "先拆分、再编号、再翻译：文字先被拆成 token，token 再变成 id，最后通过 embedding 表翻译成大模型能计算的向量。",
    coachNote:
      "通常来说，切 token 本身不是神经网络层，更像输入编码步骤。Embedding 表是训练得到的参数；从 embedding 向量开始，Transformer 层会大量使用矩阵乘法。",
    inputHint: "文本先由 tokenizer 切分",
    outputHint: "token id 查表得到向量",
    riskHint: "tokenizer 本身不理解语义",
    challenge:
      "输入一句话，观察它如何经过“文本 → tokenizer → token id → embedding 向量 → embedding 矩阵 → 送入大模型”。这里是示意，不追求真实模型的精确算法。",
    questions: [
      "Token 到底是什么，为什么现在计价经常按 token 算？",
      "是不是每家大模型的词元编码都一样？",
    ],
    sentence: "我正在学习大模型",
    tokens: ["我", "正在", "学习", "大", "模型", "大模", "型", "学", "AI"],
    target: ["我", "正在", "学习", "大", "模型"],
    success:
      "对了。tokenizer 先把文字切成 token；embedding 表把 token id 映射成向量；之后 Transformer 层才开始大量做矩阵乘法、加权和激活等神经网络计算。",
  },
  {
    id: "predict",
    concept: "概率预测",
    title: "模块二：进入大模型计算",
    mapTitle: "进入大模型",
    mapHint: "矩阵运算后预测",
    meter: 50,
    machineMode: "上下文矩阵进入模型",
    machinePulse: "正在输出候选 token 概率",
    teachLine:
      "大模型不是像人脑一样先想好完整答案；更准确地说，它是在上下文基础上做概率预测：下一个 token 哪个最可能。",
    coachNote:
      "一次预测一个 token，连续预测很多次，就形成一句话、一段解释，甚至一段代码。",
    inputHint: "前面的上下文",
    outputHint: "概率最高的下一个 token",
    riskHint: "概率高不等于事实正确",
    challenge:
      "embedding 向量进入大模型后，会经过矩阵运算和注意力计算，最后再预测下一个 token。下面用一个简单上下文观察预测结果。",
    questions: [
      "为什么大模型像一个字、一个词一样慢慢吐出来？",
      "它是不是真的理解你在问什么？",
      "概率最高的 token 就一定代表事实正确吗？",
      "为什么同一个问题有时会得到不一样的回答？",
    ],
    context: "天气预报说下午有大雨，出门前最好带",
    choices: [
      { text: "伞", probability: 86, correct: true },
      { text: "键盘", probability: 7, correct: false },
      { text: "沙漠", probability: 4, correct: false },
      { text: "月亮", probability: 3, correct: false },
    ],
    success:
      "很好。模型不是先写完整答案，而是不断做“下一个 token 应该是什么”的选择。",
  },
  {
    id: "attention",
    concept: "自注意力",
    title: "模块三：为什么 Transformer 要用自注意力",
    mapTitle: "自注意力",
    mapHint: "多头同时看关系",
    meter: 75,
    machineMode: "自注意力层计算中",
    machinePulse: "多头正在连接上下文 token",
    teachLine:
      "可以把 Transformer 想成活字印刷：前面出现过的词元都像已经摆好的活字；生成新词元时，当前位置会和这些活字逐个比较，再判断下一个该接哪个字块。",
    coachNote:
      "也就是说，输出仍然是逐 token 生成；区别在于每一步内部如何处理上下文：RNN 顺序传递，Transformer 让当前位置直接和上下文建立权重关系。",
    inputHint: "上下文 token 表示",
    outputHint: "加权汇总后的新表示",
    riskHint: "注意力权重只是计算线索",
    challenge:
      "从 RNN 的设计限制引入：如果只把信息按顺序往后传，长上下文容易丢重点。Transformer 在生成器里用自注意力，让当前位置直接比较上下文里哪些 token 更重要。",
    questions: [
      "为什么 Transformer 比传统 RNN 更适合处理长上下文？",
      "GPU 为什么适合做大模型计算，英伟达为什么这么火？",
      "注意力机制里的“注意力”，是不是等于人类真的在注意？",
      "多头注意力的“多头”到底多在哪里？",
    ],
    words: ["在", "上海", "明天", "天气", "适合", "跑步", "吗"],
    target: ["上海", "明天", "天气", "跑步"],
    heads: [
      { name: "地点头", focus: ["上海"], value: "地点信息", weight: "0.32", color: "#3578c7" },
      { name: "时间头", focus: ["明天"], value: "时间信息", weight: "0.27", color: "#f5b84b" },
      { name: "任务头", focus: ["天气", "跑步"], value: "主题与动作", weight: "0.34", color: "#138f8a" },
    ],
    success:
      "自注意力把分散在上下文里的地点、时间和任务信息汇总进当前生成位置，后面再交给输出层预测下一个 token。",
  },
  {
    id: "rag",
    concept: "RAG",
    title: "模块四：像传统搜索引擎一样先找资料",
    mapTitle: "接入资料",
    mapHint: "用证据减少幻觉",
    meter: 100,
    machineMode: "检索资料 + 问题进入上下文",
    machinePulse: "正在把证据拼进提示词",
    teachLine:
      "RAG 有点像传统搜索引擎：先找相关资料，再把资料和问题一起放进上下文，让模型基于证据生成回答。",
    coachNote:
      "没有实时天气资料时，模型只能猜“像不像适合跑步”。接入检索后，它能把天气预报和跑步建议一起放进上下文，减少事实性错误。",
    inputHint: "问题 + 检索到的资料",
    outputHint: "带证据的回答",
    riskHint: "检索资料不可靠，答案也会偏",
    challenge:
      "承接上一页：语言模型可以预测“适合/不适合”，但它不知道真实天气。下面用几个假设场景，观察没有资料、资料过期、资料正确时会生成什么不同答案。",
    questions: [
      "如果模型已经很聪明，为什么还要额外检索资料？",
      "RAG 是重新训练模型，还是把资料临时放进上下文？",
      "检索到的资料本身错了，模型会不会也跟着错？",
      "为什么很多企业知识库都会提到 RAG？",
    ],
    question: "上海明天天气适合跑步吗？",
    docs: [
      {
        id: "weather",
        title: "资料 A：上海天气预报",
        body: "明天上海有中到大雨，阵风较强，路面湿滑，能见度下降。",
        correct: true,
      },
      {
        id: "running",
        title: "资料 B：户外跑步建议",
        body: "雨天和湿滑路面会增加摔倒风险，建议改为室内训练或等天气转好。",
        correct: true,
      },
      {
        id: "old",
        title: "资料 C：过期资料",
        body: "上周上海晴朗少云，适合户外运动。该信息不能代表明天。",
        correct: false,
      },
    ],
    answers: [
      {
        text: "不适合。资料 A 显示明天上海有中到大雨、路面湿滑；资料 B 也建议雨天改为室内训练或等天气转好。",
        correct: true,
      },
      {
        text: "适合。跑步有益健康，只要身体状态不错，就可以直接出门。",
        correct: false,
      },
      {
        text: "适合。资料 C 说上周上海晴朗少云，适合户外运动，所以明天也适合跑步。",
        correct: false,
      },
      {
        text: "不确定。只看语言经验无法判断实时天气，需要先查天气预报和路面风险。",
        correct: false,
      },
    ],
    success:
      "稳了。这里的关键不是让模型“记住天气”，而是在回答前把可信资料放进上下文，用证据约束生成。",
  },
  {
    id: "summary",
    concept: "总结",
    title: "最后：给大模型祛魅",
    mapTitle: "总结",
    mapHint: "祛魅与平衡",
    meter: 100,
    machineMode: "理解闭环",
    machinePulse: "把能力和边界放在一起看",
    teachLine:
      "可以把大模型粗略理解成一部覆盖很多文字知识、很会组织语言的百科；但它不是全知者，也不天然拥有主观经验、深层体感和事实保证。",
    coachNote:
      "讲给别人听时，最重要的是让大家同时看到两面：它确实擅长组织语言和上下文，但许多深层经验、非语言知识、实时事实和价值判断仍需要人来核验。",
    inputHint: "文本、上下文、资料",
    outputHint: "概率生成的结果",
    riskHint: "别神化，也别低估",
    challenge:
      "回到最初的问题：大模型不是魔法，也不是普通搜索框。它更像一部会说话的百科：覆盖很多文字知识、擅长组织语言，但深度、真实性、非语言经验和主观判断都需要核验。",
  },
];

const state = {
  levelIndex: 0,
  score: 0,
  completed: new Set(),
  tokenInput: "我正在学习大模型",
  selectedTokens: ["我", "正在", "学习", "大模型"],
  selectedWords: new Set(),
  selectedDoc: null,
  predictionRevealed: false,
  lastFeedback: "",
  feedbackTone: "",
  canvasMode: "token",
};

const dom = {
  levelStatus: document.querySelector("#levelStatus"),
  scoreStatus: document.querySelector("#scoreStatus"),
  missionList: document.querySelector("#missionList"),
  conceptName: document.querySelector("#conceptName"),
  levelTitle: document.querySelector("#levelTitle"),
  levelMeterFill: document.querySelector("#levelMeterFill"),
  levelArea: document.querySelector("#levelArea"),
  teachLine: document.querySelector("#teachLine"),
  inputHint: document.querySelector("#inputHint"),
  outputHint: document.querySelector("#outputHint"),
  riskHint: document.querySelector("#riskHint"),
  coachNote: document.querySelector("#coachNote"),
  resetButton: document.querySelector("#resetButton"),
  toast: document.querySelector("#toast"),
  machineMode: document.querySelector("#machineMode"),
  machinePulse: document.querySelector("#machinePulse"),
  canvas: document.querySelector("#modelCanvas"),
};

const ctx = dom.canvas.getContext("2d");
let toastTimer = 0;
let animationTick = 0;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  dom.toast.textContent = message;
  dom.toast.classList.add("show");
  toastTimer = window.setTimeout(() => {
    dom.toast.classList.remove("show");
  }, 2200);
}

function resetTransientState() {
  state.selectedTokens = [];
  state.selectedWords = new Set();
  state.selectedDoc = null;
  state.predictionRevealed = false;
  state.lastFeedback = "";
  state.feedbackTone = "";
}

function learningLevels() {
  return levels.filter((level) => level.id !== "intro" && level.id !== "summary");
}

function levelById(id) {
  return levels.find((level) => level.id === id);
}

function moduleNumberForIndex(index) {
  return levels.slice(0, index + 1).filter((level) => level.id !== "intro" && level.id !== "summary").length;
}

function render() {
  if (state.levelIndex >= levels.length) {
    renderMissionList();
    renderFinalScreen();
    return;
  }

  const level = levels[state.levelIndex];
  const moduleTotal = learningLevels().length;
  state.canvasMode = level.id;
  dom.levelStatus.textContent =
    level.id === "intro" ? "说明" : level.id === "summary" ? "总结" : `${moduleNumberForIndex(state.levelIndex)} / ${moduleTotal}`;
  if (dom.scoreStatus) dom.scoreStatus.textContent = `${state.score}%`;
  dom.conceptName.textContent = level.concept;
  dom.levelTitle.textContent = level.title;
  dom.levelMeterFill.style.width = `${level.meter}%`;
  dom.teachLine.textContent = level.teachLine;
  dom.inputHint.textContent = level.inputHint;
  dom.outputHint.textContent = level.outputHint;
  dom.riskHint.textContent = level.riskHint;
  dom.coachNote.textContent = level.coachNote;
  dom.machineMode.textContent = level.machineMode;
  dom.machinePulse.textContent = level.machinePulse;

  renderMissionList();

  if (level.id === "intro") renderIntroLevel(level);
  if (level.id === "token") renderTokenLevel(level);
  if (level.id === "predict") renderPredictLevel(level);
  if (level.id === "attention") renderAttentionLevel(level);
  if (level.id === "rag") renderRagLevel(level);
  if (level.id === "summary") renderSummaryLevel(level);

  appendStepNavigation(level);
}

function renderMissionList() {
  const items = levels
    .map((level, index) => {
      const done = state.completed.has(level.id);
      const active = state.levelIndex === index;
      const statusText = done
        ? level.id === "intro" || level.id === "summary"
          ? "已读"
          : "已完成"
        : active
          ? level.id === "intro" || level.id === "summary"
            ? "阅读中"
            : "进行中"
          : level.mapHint;
      const itemNumber = level.id === "intro" ? "引" : level.id === "summary" ? "总" : moduleNumberForIndex(index);
      return `
        <li class="mission-item ${done ? "done" : ""} ${active ? "active" : ""}" data-level-index="${index}" role="button" tabindex="0" aria-current="${active ? "step" : "false"}">
          <span class="mission-number">${done ? "✓" : itemNumber}</span>
          <span class="mission-copy">
            <strong>${escapeHtml(level.mapTitle)}</strong>
            <span>${escapeHtml(statusText)}</span>
          </span>
        </li>
      `;
    })
    .join("");

  dom.missionList.innerHTML = items;
  dom.missionList.querySelectorAll("[data-level-index]").forEach((item) => {
    item.addEventListener("click", () => goToLevel(Number(item.dataset.levelIndex)));
    item.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      goToLevel(Number(item.dataset.levelIndex));
    });
  });
}

function goToLevel(index) {
  if (index === state.levelIndex || index < 0 || index >= levels.length) return;
  state.levelIndex = index;
  resetTransientState();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderWarmupQuestions(level) {
  if (!level.questions?.length) return "";
  return `
    <section class="question-primer" aria-label="本节常见问题">
      <div>
        <span>先带着问题看</span>
        <strong>常见疑问，不急着回答</strong>
      </div>
      <ol>
        ${level.questions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}
      </ol>
    </section>
  `;
}

function renderIntroLevel(level) {
  dom.levelArea.innerHTML = `
    <div class="intro-screen">
      <section class="intro-hero">
        <span>简化说明</span>
        <h3>帮助加深对“AI”的底层理解。</h3>
        <p>本人非专业科普，只讲大模型在生成/推理时的总体框架，不讲模型训练和底层实现细节。页面里的数字、矩阵和流程都是示意，重点是先建立一条能讲清楚的理解路线。</p>
      </section>
      <div class="intro-grid">
        <article>
          <span>边界 01</span>
          <h3>只谈生成，不谈训练</h3>
          <p>真实训练会涉及线性代数、概率统计、数据工程、训练优化和系统架构；这里先保留适合入门讲解的生成主线。</p>
        </article>
        <article>
          <span>边界 02</span>
          <h3>作者也是学习者</h3>
          <p>把学习过程整理成一套讲解材料；遇到严肃问题，请继续查论文、官方文档和实验。</p>
        </article>
        <article>
          <span>边界 03</span>
          <h3>将理论转成大白话</h3>
          <p>示意图里的数字、矩阵和概率用于帮助理解，不代表某个真实模型内部的精确参数。</p>
        </article>
      </div>
    </div>
  `;
}

function renderTokenLevel(level) {
  const inputValue = state.tokenInput || level.sentence;
  const tokens = state.selectedTokens.length ? state.selectedTokens : tokenizeText(inputValue);
  const vectors = tokens.map((token, index) => tokenToVector(token, index));
  const tokenChips = tokens
    .map((token, index) => `<span class="selected-token">${escapeHtml(token)} <small>#${index + 1}</small></span>`)
    .join("");
  const embeddingRows = vectors
    .slice(0, 4)
    .map(
      ({ token, values }) => `
        <div class="embedding-row">
          <strong>${escapeHtml(token)}</strong>
          <span>#${tokenIdFor(token)}</span>
          <div class="vector-values">
            ${values.map((value) => `<span class="${value >= 0 ? "embedding-positive" : "embedding-negative"}">${formatEmbeddingValue(value)}</span>`).join("")}
          </div>
        </div>
      `
    )
    .join("");
  const feedback = renderFeedback();

  dom.levelArea.innerHTML = `
    ${renderWarmupQuestions(level)}
    <p class="challenge-copy">${escapeHtml(level.challenge)}</p>
    <div class="task-grid">
      <div class="task-main">
        <label class="input-card" for="tokenInput">
          <span class="sentence-label"><b class="step-index">01</b> 输入文本</span>
          <div class="input-row">
            <input id="tokenInput" class="token-input" type="text" maxlength="42" value="${escapeHtml(inputValue)}" />
            <button class="primary-button" id="tokenizeButton" type="button">${icons.check}切分并查向量</button>
          </div>
        </label>

        <div class="token-pipeline" aria-label="文本到向量流程">
          <div class="pipeline-step">
            <span>文本输入</span>
            <strong>${escapeHtml(inputValue || "等待输入")}</strong>
          </div>
          <div class="pipeline-step">
            <span>Tokenizer</span>
            <strong>切成 ${tokens.length} 个 token</strong>
          </div>
          <div class="pipeline-step">
            <span>Embedding 表</span>
            <strong>${vectors.length ? `查到 ${vectors.length} 组向量` : "等待查表"}</strong>
          </div>
          <div class="pipeline-step">
            <span>Embedding 矩阵</span>
            <strong>${vectors.length ? "整批送入大模型" : "等待向量"}</strong>
          </div>
        </div>

        <div class="answer-tray token-result" aria-label="生成的 token">
          ${tokenChips || '<span class="tray-placeholder">输入文本后点击“切分并查向量”</span>'}
        </div>

        <div class="vector-panel">
          <div class="panel-title"><b class="step-index">02</b> 进入大模型前的 Embedding 矩阵</div>
          <p>tokenizer 只负责切分；随后每个 token 会得到一个 id，再去 embedding 表里查到一串数字。送入大模型前，这些向量会排成一个矩阵：一行对应一个 token。</p>
          <div class="embedding-matrix" aria-label="进入大模型前的 embedding 矩阵">
            <div class="embedding-row embedding-head">
              <strong>token</strong>
              <span>id</span>
              <div class="vector-values">
                <span>d1</span>
                <span>d2</span>
                <span>d3</span>
                <span>d4</span>
              </div>
            </div>
            ${embeddingRows || '<span class="tray-placeholder">还没有向量</span>'}
          </div>
        </div>

        <div class="action-row">
          <button class="secondary-button" id="exampleTokenButton" type="button">${icons.restart}恢复示例</button>
        </div>
        ${feedback}
      </div>
      <div class="task-side">
        <div class="side-stat">
          <h3>Tokenizer 做什么？</h3>
          <p>它把连续文字切成模型词表里的 token，并把这些 token 对应到 token id。这个步骤更像输入编码，不是神经网络在“理解”。</p>
        </div>
        <div class="side-stat">
          <h3>Embedding 做什么？</h3>
          <p>embedding 表像一张可训练的对照表：输入 token id，查出一串向量。大模型后续真正计算的对象，就是这些向量。</p>
        </div>
        <div class="side-stat">
          <h3>下一步会发生什么？</h3>
          <p>进入大模型前，所有 token 的 embedding 向量会组成一个矩阵。后面的 Transformer 层才会对这个矩阵做注意力、矩阵乘法和非线性变换。</p>
          <div class="flow-legend">
            <span><i class="legend-dot teal"></i>token id</span>
            <span><i class="legend-dot blue"></i>embedding 向量</span>
            <span><i class="legend-dot coral"></i>送入大模型</span>
          </div>
        </div>
      </div>
    </div>
  `;

  dom.levelArea.querySelector("#tokenizeButton").addEventListener("click", () => {
    const nextInput = dom.levelArea.querySelector("#tokenInput").value.trim();
    state.tokenInput = nextInput || level.sentence;
    state.selectedTokens = tokenizeText(state.tokenInput);
    state.feedbackTone = "good";
    state.lastFeedback = "这一步展示的是：tokenizer 负责把文字切成 token；embedding 表把 token id 变成向量。到这里为止，重点是把文本变成大模型能接收的向量。";
    render();
  });

  dom.levelArea.querySelector("#tokenInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dom.levelArea.querySelector("#tokenizeButton").click();
    }
  });

  dom.levelArea.querySelector("#exampleTokenButton").addEventListener("click", () => {
    state.tokenInput = level.sentence;
    state.selectedTokens = tokenizeText(level.sentence);
    state.lastFeedback = "";
    state.feedbackTone = "";
    render();
  });

}

const DEMO_MATRIX = [
  [0.6, -0.2, 0.4],
  [0.1, 0.7, -0.3],
  [-0.5, 0.3, 0.8],
];

function tokenizeText(text) {
  const source = String(text || "").trim();
  if (!source) return [];

  const knownTerms = [
    "Transformer",
    "tokenizer",
    "embedding",
    "大语言模型",
    "人工智能",
    "神经网络",
    "机器学习",
    "深度学习",
    "上下文",
    "注意力",
    "大模型",
    "天气预报",
    "中到大雨",
    "户外跑步",
    "室内训练",
    "资料检索",
    "概率预测",
    "正在",
    "学习",
    "模型",
    "上海",
    "明天",
    "天气",
    "适合",
    "跑步",
    "出门",
    "最好",
    "带伞",
    "回答",
    "资料",
    "检索",
    "Token",
    "token",
    "RAG",
    "AI",
    "我",
  ].sort((a, b) => b.length - a.length);
  const tokens = [];
  const isChinese = (value) => /[\u3400-\u9fff]/.test(value);
  const isPunctuation = (value) => /[，。！？、；：,.!?;:()（）《》“”"']/u.test(value);

  for (let index = 0; index < source.length; ) {
    const char = source[index];
    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    const matchedTerm = knownTerms.find((term) => source.slice(index, index + term.length).toLowerCase() === term.toLowerCase());
    if (matchedTerm) {
      tokens.push(source.slice(index, index + matchedTerm.length));
      index += matchedTerm.length;
      continue;
    }

    if (/[A-Za-z0-9]/.test(char)) {
      let end = index + 1;
      while (end < source.length && /[A-Za-z0-9_-]/.test(source[end])) end += 1;
      tokens.push(source.slice(index, end));
      index = end;
      continue;
    }

    if (isPunctuation(char)) {
      tokens.push(char);
      index += 1;
      continue;
    }

    if (isChinese(char)) {
      let end = index + 1;
      while (end < source.length && isChinese(source[end])) end += 1;
      const chineseRun = source.slice(index, end);
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        const segments = Array.from(new Intl.Segmenter("zh", { granularity: "word" }).segment(chineseRun))
          .map((segment) => segment.segment.trim())
          .filter(Boolean);
        tokens.push(...segments);
      } else {
        for (let offset = 0; offset < chineseRun.length; offset += 2) {
          tokens.push(chineseRun.slice(offset, offset + 2));
        }
      }
      index = end;
      continue;
    }

    tokens.push(char);
    index += 1;
  }

  return tokens.slice(0, 12);
}

function tokenToVector(token, index) {
  const seed = [...token].reduce((sum, char) => sum + char.codePointAt(0), 0) + index * 37;
  const values = Array.from({ length: 4 }, (_, offset) => {
    const raw = (seed * (offset + 3) + offset * 29) % 180;
    return Number(((raw - 90) / 100).toFixed(2));
  });
  return { token, values };
}

function tokenIdFor(token) {
  const seed = [...String(token)].reduce((sum, char) => sum + char.codePointAt(0), 0);
  return String((seed % 9000) + 1000);
}

function multiplyDemoMatrix(vector) {
  if (!vector?.length) return [];
  const base = vector.slice(0, 3);
  while (base.length < 3) base.push(0);
  return DEMO_MATRIX.map((row) => Number(row.reduce((sum, value, index) => sum + value * base[index], 0).toFixed(2)));
}

function formatSigned(value) {
  if (Number.isNaN(value) || value === undefined) return "0.00";
  return value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2);
}

function formatEmbeddingValue(value) {
  if (Number.isNaN(value) || value === undefined) return "0.0";
  return value.toFixed(1);
}

function renderColumnVector(values) {
  const safeValues = values.length ? values.slice(0, 3) : [0, 0, 0];
  return safeValues.map((value) => `<span>${formatSigned(value)}</span>`).join("");
}

function renderMatrix(matrix) {
  return matrix.map((row) => `<span>${row.map((value) => formatSigned(value)).join("  ")}</span>`).join("");
}

function renderPredictLevel(level) {
  const tokenLevel = levelById("token");
  const baseTokens = state.selectedTokens.length ? state.selectedTokens : tokenizeText(state.tokenInput || tokenLevel.sentence);
  const baseVector = tokenToVector(baseTokens[0] || "大模型", 0).values;
  const matrixResult = multiplyDemoMatrix(baseVector);
  const probabilityDistribution = level.choices
    .map(
      (choice) => `
        <div class="probability-row ${choice.correct ? "top" : ""}">
          <strong>p(${escapeHtml(choice.text)})</strong>
          <span>${(choice.probability / 100).toFixed(2)}</span>
          <i style="width:${choice.probability}%"></i>
        </div>
      `
    )
    .join("");
  dom.levelArea.innerHTML = `
    ${renderWarmupQuestions(level)}
    <p class="challenge-copy">${escapeHtml(level.challenge)}</p>
    <div class="predict-ordered-grid">
      <div class="rule-panel predict-card">
        <div>
          <span class="sentence-label"><b class="step-index">01</b> 运算规则</span>
          <h3>向量 × 权重矩阵 → 新表示</h3>
          <p>大模型会反复把输入向量乘以训练得到的权重矩阵，得到更适合当前任务的新表示。</p>
        </div>
        <div class="matrix-equation" aria-label="Transformer 矩阵运算示意">
          <div class="matrix-block vector-block">
            ${renderColumnVector(baseVector)}
          </div>
          <span class="math-symbol">×</span>
          <div class="matrix-block">
            ${renderMatrix(DEMO_MATRIX)}
          </div>
          <span class="math-symbol">=</span>
          <div class="matrix-block result-block">
            ${renderColumnVector(matrixResult)}
          </div>
        </div>
      </div>

      <div class="context-box predict-card predict-context-card">
        <span><b class="step-index">02</b> 上下文进入模型</span>
        <strong>${escapeHtml(level.context)} <span class="inline-token">?</span></strong>
        <p>这里的上下文已经是 embedding 矩阵，不是人脑里的一段完整理解。模型会把当前位置映射到“下一个 token”的概率空间。</p>
      </div>

      <div class="probability-panel predict-card">
        <span class="sentence-label"><b class="step-index">03</b> 直接输出概率向量</span>
        <h3>模型不是等人筛选，而是输出一组概率</h3>
        <p>这些数表示下一步生成每个 token 的可能性。常见策略是选概率最高的，也可以按概率采样，所以它本质上是概率预测。</p>
        <div class="probability-distribution" aria-label="模型输出的概率分布">
          ${probabilityDistribution}
          <small>四个候选已归一化，总和为 1。</small>
        </div>
      </div>

      <div class="side-stat predict-card">
        <h3><b class="step-index">04</b> 生成其实是循环预测</h3>
        <p>选出一个 token 后，它会被接回上下文，模型再预测下一个 token。下面把这个过程缩成一个小流程。</p>
        <div class="generation-loop" aria-label="连续生成循环示意">
          <div class="loop-row">
            <div class="loop-node context">上下文<br><span>天气...最好带</span></div>
            <span class="loop-arrow">→</span>
            <div class="loop-node model">模型</div>
            <span class="loop-arrow">→</span>
            <div class="loop-node output">输出<br><span>伞</span></div>
          </div>
          <div class="loop-return">新 token 接回上下文</div>
          <div class="loop-row">
            <div class="loop-node context">新上下文<br><span>天气...最好带伞</span></div>
            <span class="loop-arrow">→</span>
            <div class="loop-node model">模型</div>
            <span class="loop-arrow">→</span>
            <div class="loop-node output">输出<br><span>，并且关好门窗</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAttentionLevel(level) {
  const tokenItems = level.words
    .map((word) => {
      const role = level.target.includes(word) ? "key" : "soft";
      return `<span class="attention-token ${role}">${escapeHtml(word)}</span>`;
    })
    .join("");

  dom.levelArea.innerHTML = `
    ${renderWarmupQuestions(level)}
    <p class="challenge-copy">${escapeHtml(level.challenge)}</p>
    <div class="attention-sequence">
      <div class="attention-row">
        <div class="memory-fade-panel">
          <span><b class="step-index">01</b> 循环记忆会逐步被覆盖</span>
          <h3>传统 RNN：越往后传，前面的线索越难看清</h3>
          <p>如果信息只能按顺序一站站传，新 token 会不断压低旧线索的存在感。下面让词元按顺序出现：新的词元最清楚，越早出现的词元越淡。</p>
          <div class="rnn-fade-demo" aria-label="RNN 长上下文信息变淡动画">
            <div class="rnn-fade-stage">
              <span class="fade-word" style="--i:0">上海</span>
              <span class="fade-word" style="--i:1">明天</span>
              <span class="fade-word" style="--i:2">天气</span>
              <span class="fade-word" style="--i:3">适合</span>
              <span class="fade-word" style="--i:4">跑步</span>
              <span class="fade-word" style="--i:5">吗</span>
            </div>
          </div>
        </div>

        <div class="attention-why-panel">
          <span><b class="step-index">02</b> 为什么需要 Transformer</span>
          <h3>Transformer 让当前位置直接看上下文</h3>
          <p>RNN 更像把信息一站站往后传：前面的词要经过很多步才能影响当前位置。Transformer 换了思路：让当前位置直接和上下文里的 token 建关系。</p>
          <div class="attention-compare">
            <div>
              <strong>RNN 式顺序传递</strong>
              <div class="sequence-chain" aria-label="顺序传递示意">
                <span>上海</span><b>→</b><span>明天</span><b>→</b><span>天气</span><b>→</b><span>跑步</span><b>→</b><span>当前位置</span>
              </div>
              <p>信息沿一条链传下去，距离远时容易被稀释。</p>
            </div>
            <div>
              <strong>Transformer 式关系计算</strong>
              <div class="relation-chain" aria-label="并行关系计算示意">
                <span>上海</span><span>明天</span><span>天气</span><span>跑步</span><b>⇄</b><span>当前位置</span>
              </div>
              <p>当前位置可以直接比较多个 token 的关系。</p>
            </div>
          </div>
        </div>
      </div>

      <div class="attention-row">
        <div class="transformer-arch-panel">
          <span><b class="step-index">03</b> 参考论文里的解码器结构</span>
          <h3>自注意力是生成器块里的第一步</h3>
          <div class="paper-decoder" aria-label="Transformer 解码器简化结构">
            <div class="paper-input">输入：词元向量 + 位置编码<br><em>上下文矩阵 X</em></div>
            <div class="paper-arrow">↓</div>
            <div class="paper-block">
              <div class="residual-rail">残差连接贯穿每个子层</div>
              <div class="paper-layer active">掩码多头自注意力<br><em>这里展开 Q / K / V</em></div>
              <div class="paper-layer">残差连接 + 归一化</div>
              <div class="paper-layer">前馈网络 FFN</div>
              <div class="paper-layer">残差连接 + 归一化</div>
            </div>
            <div class="paper-arrow">↓</div>
            <div class="paper-output">线性层 + softmax 归一化<br><em>输出概率向量 p</em></div>
          </div>
          <p>这是按经典 Transformer 解码器侧重画的简化版。完整论文结构还包含编码器到解码器的注意力；这里先聚焦生成器最相关的“掩码自注意力”。</p>
        </div>

        <div class="attention-rule-panel">
          <span><b class="step-index">04</b> Q / K / V 动画示意</span>
          <h3>同一个 X 分三路投影，再合成新表示</h3>
          <div class="qkv-board" aria-label="QKV 投影和注意力计算动画">
            <div class="qkv-source-card">
              <strong>上下文矩阵 X</strong>
              <div>${tokenItems}</div>
            </div>
            <div class="qkv-projection-grid">
              <div class="qkv-matrix-card q">
                <span>X × Wq</span>
                <strong>查询矩阵 Q</strong>
                <em>当前位置拿它去“问”</em>
              </div>
              <div class="qkv-matrix-card k">
                <span>X × Wk</span>
                <strong>键矩阵 K</strong>
                <em>上下文拿它来“匹配”</em>
              </div>
              <div class="qkv-matrix-card v">
                <span>X × Wv</span>
                <strong>值矩阵 V</strong>
                <em>真正被汇总的内容</em>
              </div>
            </div>
            <div class="qkv-parameter-note">Wq / Wk / Wv 是训练阶段从海量数据里学到的权重矩阵。推理时它们固定不变，可以先把它们当作常数。</div>
            <div class="attention-calc-flow">
              <div>Q × K<sup>T</sup><em>算相关度</em></div>
              <strong>→</strong>
              <div>softmax<em>变成权重</em></div>
              <strong>→</strong>
              <div>权重 × V<em>加权汇总</em></div>
              <strong>→</strong>
              <div>新表示<em>送往下一层</em></div>
            </div>
          </div>
          <p>所以 Q/K/V 不是三个新输入，而是同一份上下文矩阵经过三组训练得到的权重矩阵后，变成了三种用途的表示。</p>
        </div>
      </div>

      <div class="attention-row">
        <div class="side-stat attention-main-note">
          <h3><b class="step-index">05</b> 单头示例：从地点角度看</h3>
          <p>先只看一个头：假设它专门从“地点”角度工作。当前位置要回答跑步建议时，它会把最大权重给“上海”，因为天气判断必须先落到地点。</p>
          <div class="single-attention-demo" aria-label="单头注意力示意">
            <span class="attention-token current">当前位置</span>
            <strong>地点头看向</strong>
            <span class="attention-token key">上海</span>
            <span class="attention-token soft">明天</span>
            <span class="attention-token soft">天气</span>
            <span class="attention-token soft">跑步</span>
          </div>
          <div class="single-head-bars" aria-label="地点头权重示意">
            <div style="--w:72%"><span>上海</span><b></b><em>0.72</em></div>
            <div style="--w:12%"><span>明天</span><b></b><em>0.12</em></div>
            <div style="--w:10%"><span>天气</span><b></b><em>0.10</em></div>
            <div style="--w:6%"><span>跑步</span><b></b><em>0.06</em></div>
          </div>
        </div>

        <div class="side-stat attention-main-note">
          <h3><b class="step-index">06</b> 再扩展成多头注意力</h3>
          <p>多头不是另一个概念，而是把单头注意力并行做多组。每个头都会先用 Q/K 算出“该看谁、看多重”，再用这些权重去加权汇总 V 里的内容，形成当前位置的新表示。</p>
          <div class="attention-head-list">
            ${level.heads
              .map(
                (head) => `
                  <div class="attention-head-card" style="--head-color:${head.color}">
                    <strong>${escapeHtml(head.name)}</strong>
                    <span>${head.focus.map((item) => escapeHtml(item)).join(" / ")}</span>
                    <em>Q/K 权重 ${escapeHtml(head.weight)} · 汇总 V：${escapeHtml(head.value)}</em>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </div>

      <div class="attention-row attention-row-single">
        <div class="side-stat attention-main-note attention-output-panel">
          <h3><b class="step-index">07</b> 输出概率，并接到资料检索</h3>
          <p>多头注意力先把不同头得到的新表示合并，再送入后面的层。通常语言模型会把最后一层的当前位置表示送入线性层得到 logits，再用 softmax 变成下一个 token 的概率分布。下面只是语言预测，不代表真实天气；下一步要接入资料检索，用证据约束回答。</p>
          <div class="attention-output-flow" aria-label="自注意力到概率输出">
            <span>上下文表示</span>
            <strong>→</strong>
            <span>多头自注意力</span>
            <strong>→</strong>
            <span>当前位置新表示</span>
            <strong>→</strong>
            <span>线性层 + softmax</span>
          </div>
          <div class="attention-probability-output" aria-label="概率向量示意">
            <strong>概率向量 p</strong>
            <div><span>适合</span><em>0.42</em></div>
            <div><span>不适合</span><em>0.38</em></div>
            <div><span>不知道</span><em>0.20</em></div>
            <small>总和为 1；是否真实还要看检索到的天气资料。</small>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderRagLevel(level) {
  const feedback = renderFeedback();
  const ragScenarios = [
    {
      title: "假设一：不查资料，直接生成",
      body: "模型会沿着“跑步有益健康”这类常见语言经验往下写，容易得到一个顺口但没查天气的答案。",
      answer: "对应回答 2：听起来积极，但没有任何天气证据。",
    },
    {
      title: "假设二：查到了过期资料",
      body: "如果把“上周晴朗”当成证据放进上下文，模型会顺着旧线索回答，文字通顺但依据已经过期。",
      answer: "对应回答 3：不是模型不会写，而是证据不适用。",
    },
    {
      title: "假设三：查到正确资料再回答",
      body: "如果把明天中到大雨、路面湿滑、雨天跑步风险放进上下文，模型就会围绕资料 A/B 组织回答。",
      answer: "对应回答 1：有天气和跑步建议支撑，结论更可靠。",
    },
    {
      title: "假设四：资料经常会变",
      body: "天气、制度、产品手册、业务口径都会更新。RAG 不是让模型永久记住一切，而是在回答前先把当前可用资料放进上下文。",
      answer: "对应回答 4：没有当前资料时，承认不确定比硬猜更稳。",
    },
  ];

  dom.levelArea.innerHTML = `
    ${renderWarmupQuestions(level)}
    <p class="challenge-copy">${escapeHtml(level.challenge)}</p>
    <div class="rag-analogy" aria-label="RAG 形象理解">
      <span>RAG 像开卷答题</span>
      <div>
        <article>
          <strong>先检索</strong>
          <p>从资料库或搜索结果里找和问题最相关的片段。</p>
        </article>
        <b>→</b>
        <article>
          <strong>拼进上下文</strong>
          <p>把问题和资料一起放进提示词，而不是临时训练模型。</p>
        </article>
        <b>→</b>
        <article>
          <strong>再生成</strong>
          <p>模型仍按概率生成，但会被证据牵引到更靠谱的方向。</p>
        </article>
      </div>
    </div>
    <div class="context-box">
      <span>问题</span>
      <strong>${escapeHtml(level.question)}</strong>
    </div>

    <div class="rag-simulation-layout" aria-label="RAG 假设场景与示例回答">
      <section class="rag-scenario-column">
        <div class="rag-section-title">
          <span>推演场景</span>
          <strong>先看不同假设会生成什么结果</strong>
        </div>
        <div class="rag-explain-grid">
          ${ragScenarios
            .map(
              (item, index) => `
                <article>
                  <span><b class="step-index">${String(index + 1).padStart(2, "0")}</b> 假设进展</span>
                  <h3>${escapeHtml(item.title)}</h3>
                  <p>${escapeHtml(item.body)}</p>
                  <em>${escapeHtml(item.answer)}</em>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="rag-answer-column">
        <div class="rag-section-title">
          <span>示例回答</span>
          <strong>把输出和左侧假设对应起来看</strong>
        </div>
        <div class="rag-answers">
          <div class="choice-grid">
            ${level.answers
              .map(
                (answer, index) => `
                  <button class="choice-card" type="button" data-answer="${index}">
                    <strong>回答 ${index + 1}</strong>
                    <span>${escapeHtml(answer.text)}</span>
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
    </div>

    <div class="rag-section-title">
      <span>示例资料</span>
      <strong>最后判断哪些资料应该被放进上下文</strong>
    </div>
    <div class="doc-grid" aria-label="可选资料">
      ${level.docs
        .map(
          (doc) => `
            <button class="doc-card ${state.selectedDoc === doc.id ? "selected" : ""} ${doc.correct ? "" : "bad"}" type="button" data-doc="${escapeHtml(doc.id)}">
              <h3>${escapeHtml(doc.title)}</h3>
              <p>${escapeHtml(doc.body)}</p>
            </button>
          `
        )
        .join("")}
    </div>
    ${feedback}
  `;

  dom.levelArea.querySelectorAll("[data-doc]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDoc = button.dataset.doc;
      state.lastFeedback = "";
      render();
    });
  });

  dom.levelArea.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = level.answers[Number(button.dataset.answer)];
      const doc = level.docs.find((item) => item.id === state.selectedDoc);
      if (!doc) {
        state.feedbackTone = "warn";
        state.lastFeedback = "先选资料。RAG 的重点是把可靠资料放进上下文，再让模型回答。";
        render();
        return;
      }

      if (answer.correct && doc.correct) {
        completeLevel(level, level.success);
        return;
      }

      if (answer.correct && !doc.correct) {
        state.feedbackTone = "warn";
        state.lastFeedback = "答案本身是对的，但证据没选对。教学时可以强调：RAG 依赖检索质量。";
      } else {
        state.feedbackTone = "warn";
        state.lastFeedback = "这就是这页要展示的风险：没有证据、证据过期或资料放错，都会让输出看起来像答案但不可靠。";
      }
      render();
    });
  });
}

function renderSummaryLevel(level) {
  dom.levelArea.innerHTML = `
    <div class="summary-screen">
      <section class="doubao-contrast" aria-label="豆包模型对比">
        <article>
          <img src="assets/doubao-ideal.png" alt="期待中的智能豆包模型">
          <div>
            <span>理想想象</span>
            <h3>希望中的智能豆包</h3>
            <p>像是完整理解了问题，稳稳组织答案。</p>
          </div>
        </article>
        <article>
          <img src="assets/doubao-probability-fail.jpg" alt="只按概率乱接时翻车的豆包模型">
          <div>
            <span>概率翻车</span>
            <h3>概率答崩的豆包，孬得淌口水</h3>
            <p>词看似接上了，但事实和逻辑可能已经歪了。</p>
          </div>
        </article>
      </section>

      <section class="summary-hero">
        <span>祛魅总结</span>
        <h3>大模型更像一部会说话的百科，但不是全知大脑。</h3>
        <p>${escapeHtml(level.challenge)}</p>
      </section>

      <div class="summary-grid" aria-label="大模型平衡理解">
        <article>
          <span>别神化</span>
          <h3>它不是知道所有事，也不是句句都对</h3>
          <p>大模型可以把话说得很像答案，但实时事实、专业细节和主观判断都可能出错；越重要的问题越需要证据。</p>
        </article>
        <article>
          <span>别低估</span>
          <h3>它的创新在于规模化处理上下文</h3>
          <p>token、向量、矩阵运算和自注意力，让模型能在大量文字里计算关系，并把结果组织成连续语言。</p>
        </article>
        <article>
          <span>别甩手</span>
          <h3>它不能替你承担判断责任</h3>
          <p>它能辅助整理和生成，但数据偏差、检索错误、价值选择和后果责任仍要由人来把关。</p>
        </article>
      </div>

      <div class="final-script summary-script">
        <h3>五句话收尾</h3>
        <ol>
          <li>文字先被拆成 token，再被翻译成向量，模型才能计算。</li>
          <li>大模型生成内容时，本质上是在上下文里预测下一个 token。</li>
          <li>Transformer 的自注意力让当前生成位置和前文 token 建立关系。</li>
          <li>资料检索可以把外部证据放进上下文，但资料本身也要可靠。</li>
          <li>所以，对大模型最好的态度是：大胆使用，清楚边界，认真核验。</li>
        </ol>
      </div>

      <div class="summary-use-guide" aria-label="大模型使用建议">
        <div>
          <span>哪些领域适合用</span>
          <h3>适合让它做“语言和结构”的工作</h3>
          <ul>
            <li>学习入门：把陌生概念讲成可理解的版本。</li>
            <li>写作整理：提纲、摘要、润色、换一种表达。</li>
            <li>代码辅助：解释报错、生成草稿、梳理方案。</li>
            <li>资料归纳：在给出来源后，帮你整理重点和差异。</li>
          </ul>
        </div>
        <div>
          <span>怎么用更稳</span>
          <h3>把它当助手，不当裁判</h3>
          <ul>
            <li>先说清目标、受众、限制和输出格式。</li>
            <li>需要事实时给资料，并要求列出依据和不确定点。</li>
            <li>关键结论自己核验；医疗、法律、金融等高风险问题找专业来源。</li>
            <li>让它帮你扩大思路，但最后的价值判断和责任仍然在人。</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function renderFeedback() {
  if (!state.lastFeedback) return "";
  return `<div class="feedback-box ${state.feedbackTone}">${escapeHtml(state.lastFeedback)}</div>`;
}

function completeLevel(level, message) {
  markLevelComplete(level);
  state.feedbackTone = "good";
  state.lastFeedback = message;
  showToast(message);
  render();
}

function appendStepNavigation(level) {
  if (dom.levelArea.querySelector("[data-step-navigation]")) return;

  const row = document.createElement("div");
  row.className = "action-row module-nav";
  row.dataset.stepNavigation = "true";

  const previousButton = document.createElement("button");
  previousButton.className = "secondary-button";
  previousButton.type = "button";
  previousButton.innerHTML = `${icons.back}上一步`;
  previousButton.disabled = state.levelIndex === 0;
  previousButton.addEventListener("click", () => {
    if (state.levelIndex === 0) return;
    state.levelIndex -= 1;
    resetTransientState();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const nextButton = document.createElement("button");
  nextButton.className = "primary-button";
  nextButton.type = "button";
  nextButton.innerHTML = `${icons.next}${level.id === "intro" ? "进入模块一" : level.id === "summary" ? "重新开始" : "下一步"}`;
  nextButton.addEventListener("click", () => {
    markLevelComplete(level);
    if (level.id === "summary") {
      state.levelIndex = 0;
      state.score = 0;
      state.completed = new Set();
      resetTransientState();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (state.levelIndex < levels.length - 1) {
      state.levelIndex += 1;
    } else {
      state.levelIndex = levels.length;
    }
    resetTransientState();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  row.append(previousButton, nextButton);
  dom.levelArea.appendChild(row);
}

function markLevelComplete(level) {
  if (state.completed.has(level.id)) return;
  state.completed.add(level.id);
  if (level.id !== "intro" && level.id !== "summary") state.score = Math.min(100, state.score + 25);
}

function renderFinalScreen() {
  const moduleTotal = learningLevels().length;
  state.canvasMode = "final";
  dom.levelStatus.textContent = `${moduleTotal} / ${moduleTotal}`;
  if (dom.scoreStatus) dom.scoreStatus.textContent = `${state.score}%`;
  dom.conceptName.textContent = "完成";
  dom.levelTitle.textContent = "你已经能把大模型讲成一个故事";
  dom.levelMeterFill.style.width = "100%";
  dom.teachLine.textContent = "把这四个模块连起来，就是一段很清楚的大模型入门课。";
  dom.inputHint.textContent = "文本和资料";
  dom.outputHint.textContent = "连续生成的回答";
  dom.riskHint.textContent = "幻觉需要验证";
  dom.coachNote.textContent = "教学时先给直觉，再给术语。听众会更容易把 token、预测、注意力和 RAG 串起来。";
  dom.machineMode.textContent = "课程已完成";
  dom.machinePulse.textContent = "可以用于对外讲解";

  dom.levelArea.innerHTML = `
    <div class="final-screen">
      <p class="challenge-copy">这套交互演示已经把四个核心直觉串起来：切片、预测、加权、查证。下面这段可以直接当作你的讲课开场。</p>
      <div class="final-score">
        <div><span>完成模块</span><strong>${moduleTotal}</strong></div>
        <div><span>核心概念</span><strong>4</strong></div>
      </div>
      <div class="final-script">
        <h3>五句话讲清楚大模型</h3>
        <ol>
          <li>大模型先用 tokenizer 把文字切成 token，再通过 embedding 表把 token id 变成向量。</li>
          <li>它最基础的动作，是根据上下文预测下一个 token。</li>
          <li>很多 token 连续预测出来，就形成回答、文章或代码。</li>
          <li>注意力机制让模型在长文本中抓住更重要的词。</li>
          <li>因为它会生成看起来合理的内容，所以重要问题要用证据和 RAG 来约束。</li>
        </ol>
      </div>
      <div class="action-row">
        <button class="primary-button" id="playAgainButton" type="button">${icons.restart}重新开始</button>
      </div>
    </div>
  `;

  dom.levelArea.querySelector("#playAgainButton").addEventListener("click", () => {
    state.levelIndex = 0;
    state.score = 0;
    state.completed = new Set();
    resetTransientState();
    render();
  });
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

function resizeCanvasForDisplay() {
  const rect = dom.canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.round(rect.width * ratio));
  const height = Math.max(180, Math.round(rect.height * ratio));
  if (dom.canvas.width !== width || dom.canvas.height !== height) {
    dom.canvas.width = width;
    dom.canvas.height = height;
  }
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { width: rect.width, height: rect.height };
}

function drawCanvas() {
  const { width, height } = resizeCanvasForDisplay();
  animationTick += 0.018;
  ctx.clearRect(0, 0, width, height);

  drawGrid(width, height);

  if (state.canvasMode === "token") {
    drawTokenFlow(width, height);
  } else if (state.canvasMode === "attention") {
    drawAttentionFlow(width, height);
  } else if (state.canvasMode === "summary") {
    drawSummaryFlow(width, height);
  } else {
    drawModelCore(width, height);
  }
  if (state.canvasMode === "predict") drawPredictionFlow(width, height);
  if (state.canvasMode === "rag") drawRagFlow(width, height);
  if (state.canvasMode === "final") drawFinalFlow(width, height);

  requestAnimationFrame(drawCanvas);
}

function drawGrid(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(24, 32, 38, 0.06)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 28) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 28) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawModelCore(width, height) {
  const cx = state.canvasMode === "token" ? (width > 680 ? width * 0.68 : width * 0.62) : state.canvasMode === "predict" ? width * 0.5 : width * 0.56;
  const cy = height * 0.44;
  const layers = [
    { x: cx - 118, count: 4, color: "#138f8a" },
    { x: cx, count: 5, color: "#3578c7" },
    { x: cx + 118, count: 4, color: "#e85d4f" },
  ];
  const points = layers.map((layer) => {
    const spacing = 40;
    const start = cy - ((layer.count - 1) * spacing) / 2;
    return Array.from({ length: layer.count }, (_, index) => ({
      x: layer.x,
      y: start + index * spacing,
      color: layer.color,
    }));
  });

  ctx.save();
  ctx.lineWidth = 1.2;
  for (let i = 0; i < points.length - 1; i++) {
    points[i].forEach((from) => {
      points[i + 1].forEach((to, index) => {
        const pulse = 0.18 + Math.abs(Math.sin(animationTick * 2 + index)) * 0.22;
        ctx.strokeStyle = `rgba(24, 32, 38, ${pulse})`;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      });
    });
  }

  points.flat().forEach((point, index) => {
    const radius = 7 + Math.sin(animationTick * 4 + index) * 1.3;
    ctx.fillStyle = point.color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  if (state.canvasMode === "predict") {
    drawNetworkTrace(points);
  }
  ctx.restore();
}

function drawTokenFlow(width, height) {
  const current = levelById("token");
  const tokens = state.selectedTokens.length ? state.selectedTokens : tokenizeText(state.tokenInput || current.sentence);
  const inputText = state.tokenInput || current.sentence;
  const visibleTokens = tokens.slice(0, 4);
  drawLabel("原句先经过 tokenizer，token id 再查 embedding 表，形成矩阵后进入大模型", 34, 34, "#182026");

  const sentenceX = 42;
  const sentenceW = Math.min(168, Math.max(146, width * 0.18));
  const tokenizerX = sentenceX + sentenceW + 70;
  const tokenX = tokenizerX + 112;
  const matrixX = tokenX + 128;
  const centerY = 124;
  const rowStartY = 78;
  const rowGap = 31;
  const rowYs = visibleTokens.map((_, index) => rowStartY + index * rowGap);

  drawInlineSentence(inputText, sentenceX, centerY, sentenceW);
  drawTokenizerNode(tokenizerX, centerY);
  drawFlowArrow(sentenceX + sentenceW + 8, centerY, tokenizerX - 48, centerY, "#138f8a", 0.05);

  visibleTokens.forEach((token, index) => {
    const rowY = rowYs[index];
    drawFlowArrow(tokenizerX + 42, centerY, tokenX - 12, rowY, "#138f8a", 0.12 + index * 0.05);
    drawFlowToken(token, tokenIdFor(token), tokenX, rowY, index);
    drawFlowArrow(tokenX + 94, rowY, matrixX - 12, rowY, "#3578c7", 0.24 + index * 0.05);
  });

  const matrixSize = drawFlowEmbeddingMatrix(matrixX, rowStartY - 26, visibleTokens);
  const modelX = Math.min(width - 104, matrixX + matrixSize.width + 154);
  const matrixToModelStart = matrixX + matrixSize.width + 16;
  const matrixToModelEnd = Math.max(matrixToModelStart + 48, modelX - 18);
  drawFlowArrow(matrixToModelStart, centerY, matrixToModelEnd, centerY, "#e85d4f", 0.5);
  drawLabel("矩阵 → 模型", matrixToModelStart - 4, centerY - 27, "#182026");
  drawBareModelCore(modelX, centerY);
}

function drawInlineSentence(text, x, y, width) {
  ctx.save();
  ctx.fillStyle = "rgba(255, 241, 207, 0.78)";
  ctx.strokeStyle = "rgba(245, 184, 75, 0.72)";
  ctx.lineWidth = 1.5;
  roundRect(x, y - 25, width, 50, 25);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#7c5a12";
  ctx.font = "800 11px Microsoft YaHei, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("原句", x + 14, y - 6);
  ctx.fillStyle = "#182026";
  ctx.font = "800 14px Microsoft YaHei, sans-serif";
  ctx.fillText(truncateCanvasText(text, 9), x + 14, y + 15);
  ctx.restore();
}

function drawTokenizerNode(x, y) {
  const radius = 28;
  const tick = Math.sin(animationTick * 3);

  ctx.save();
  ctx.shadowColor = "rgba(19, 143, 138, 0.28)";
  ctx.shadowBlur = 16;
  ctx.fillStyle = "rgba(223, 244, 241, 0.94)";
  ctx.strokeStyle = "#138f8a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "rgba(19, 143, 138, 0.85)";
  ctx.lineWidth = 1.5;
  [-10, 0, 10].forEach((offset, index) => {
    ctx.beginPath();
    ctx.moveTo(x - 13, y + offset);
    ctx.lineTo(x + 13, y + offset + tick * (index - 1));
    ctx.stroke();
  });

  ctx.fillStyle = "#182026";
  ctx.font = "800 12px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Tokenizer", x, y + 45);
  ctx.restore();
}

function drawFlowToken(token, id, x, y, index) {
  const palette = ["#dff4f1", "#fff1cf", "#e5eefb", "#ffe4df"];
  const stroke = ["#138f8a", "#f5b84b", "#3578c7", "#e85d4f"];
  const pulse = Math.max(0, Math.sin(animationTick * 4 + index * 0.8));

  ctx.save();
  ctx.fillStyle = palette[index % palette.length];
  ctx.strokeStyle = stroke[index % stroke.length];
  ctx.lineWidth = 1.5;
  ctx.shadowColor = stroke[index % stroke.length];
  ctx.shadowBlur = 4 + pulse * 7;
  roundRect(x, y - 13, 88, 26, 13);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#182026";
  ctx.font = "800 13px Microsoft YaHei, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(truncateCanvasText(token, 4), x + 10, y);

  ctx.fillStyle = "#66717c";
  ctx.font = "800 11px Consolas, monospace";
  ctx.textAlign = "right";
  ctx.fillText(`#${id}`, x + 80, y);
  ctx.restore();
}

function drawFlowEmbeddingMatrix(x, y, tokens) {
  const rows = Math.max(2, Math.min(tokens.length, 4));
  const cols = 4;
  const cellW = 34;
  const cellH = 22;
  const headerH = 28;
  const padX = 11;
  const width = padX * 2 + cellW * cols;
  const height = headerH + rows * cellH + 20;

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.74)";
  ctx.strokeStyle = "rgba(53, 120, 199, 0.42)";
  ctx.lineWidth = 1.5;
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#182026";
  ctx.font = "800 12px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Embedding 矩阵", x + width / 2, y + 18);

  const safeTokens = tokens.length ? tokens : ["我", "学习"];
  safeTokens.slice(0, rows).forEach((token, rowIndex) => {
    const vector = tokenToVector(token, rowIndex).values;
    vector.forEach((value, colIndex) => {
      const cx = x + padX + colIndex * cellW;
      const cy = y + headerH + rowIndex * cellH;
      ctx.fillStyle = value >= 0 ? "rgba(53, 120, 199, 0.17)" : "rgba(232, 93, 79, 0.14)";
      ctx.strokeStyle = "rgba(24, 32, 38, 0.12)";
      ctx.lineWidth = 1;
      roundRect(cx, cy, cellW - 5, cellH - 4, 4);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#182026";
      ctx.font = "800 9px Consolas, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(formatEmbeddingValue(value), cx + (cellW - 5) / 2, cy + (cellH - 4) / 2);
    });
  });

  ctx.fillStyle = "#66717c";
  ctx.font = "800 10px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("token 行 × 向量维度", x + width / 2, y + height - 7);
  ctx.restore();

  return { width, height };
}

function drawBareModelCore(x, y) {
  const layerGap = 42;
  const nodeGap = 25;
  const layers = [
    { count: 3, color: "#138f8a" },
    { count: 4, color: "#3578c7" },
    { count: 3, color: "#e85d4f" },
  ].map((layer, layerIndex) => {
    const startY = y - ((layer.count - 1) * nodeGap) / 2;
    return Array.from({ length: layer.count }, (_, index) => ({
      x: x + layerIndex * layerGap,
      y: startY + index * nodeGap,
      color: layer.color,
    }));
  });

  ctx.save();
  ctx.fillStyle = "#182026";
  ctx.font = "800 12px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("大模型主体", x + layerGap, y - 66);

  for (let i = 0; i < layers.length - 1; i += 1) {
    layers[i].forEach((from) => {
      layers[i + 1].forEach((to, index) => {
        const alpha = 0.13 + Math.abs(Math.sin(animationTick * 2.2 + index + i)) * 0.16;
        ctx.strokeStyle = `rgba(24, 32, 38, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      });
    });
  }

  drawNetworkTrace(layers);

  layers.flat().forEach((point, index) => {
    const radius = 5.4 + Math.sin(animationTick * 4 + index) * 0.7;
    ctx.fillStyle = point.color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
  ctx.restore();
}

function truncateCanvasText(text, maxLength) {
  const value = String(text || "");
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
}

function drawCompactTokenFlow(width, height, inputText, tokens) {
  const left = 28;
  const cardW = Math.min(150, width * 0.38);
  const right = width - left - cardW;
  const cardH = 54;
  const topY = 55;
  const bottomY = 138;

  drawStageCard({ x: left, y: topY, w: cardW, h: cardH, step: "1", title: "原句", fill: "#fff1cf", lines: [truncateCanvasText(inputText, 7)] });
  drawStageCard({ x: right, y: topY, w: cardW, h: cardH, step: "2", title: "Tokenizer", fill: "#dff4f1", lines: ["切分"] });
  drawTokenIdCard(left, bottomY, cardW, cardH + 8, tokens);
  drawMatrixCard(right, bottomY, cardW, cardH + 8, tokens);

  drawConnectorArrow(left + cardW, topY + cardH / 2, right, topY + cardH / 2, "#138f8a", 0.05);
  drawConnectorArrow(right + cardW / 2, topY + cardH, left + cardW / 2, bottomY, "#138f8a", 0.15);
  drawConnectorArrow(left + cardW, bottomY + (cardH + 8) / 2, right, bottomY + (cardH + 8) / 2, "#3578c7", 0.25);
  drawConnectorArrow(right + cardW, bottomY + (cardH + 8) / 2, width - 24, bottomY + (cardH + 8) / 2, "#e85d4f", 0.35);

  ctx.save();
  ctx.fillStyle = "#182026";
  ctx.font = "800 11px Microsoft YaHei, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("送入大模型", width - 26, bottomY + cardH + 28);
  ctx.restore();
}

function drawStageCard({ x, y, w, h, step, title, fill, lines }) {
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.strokeStyle = "rgba(24,32,38,0.14)";
  ctx.lineWidth = 1.5;
  roundRect(x, y, w, h, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = fill;
  ctx.strokeStyle = "rgba(24,32,38,0.1)";
  roundRect(x + 10, y + 10, 28, 28, 7);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#182026";
  ctx.font = "800 12px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(step, x + 24, y + 24);

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.font = "800 13px Microsoft YaHei, sans-serif";
  ctx.fillText(title, x + 46, y + 29);
  ctx.fillStyle = "#43505a";
  ctx.font = "700 12px Microsoft YaHei, sans-serif";
  lines.slice(0, 3).forEach((line, index) => {
    ctx.fillText(line, x + 12, y + 58 + index * 20);
  });
  ctx.restore();
}

function drawTokenIdCard(x, y, w, h, tokens) {
  drawStageCard({ x, y, w, h, step: "3", title: "Token ID", fill: "#dff4f1", lines: [] });
  ctx.save();
  tokens.slice(0, 4).forEach((token, index) => {
    const rowY = y + 49 + index * 16;
    ctx.fillStyle = "#182026";
    ctx.font = "800 11px Microsoft YaHei, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(truncateCanvasText(token, 4), x + 14, rowY);
    ctx.fillStyle = "#66717c";
    ctx.textAlign = "right";
    ctx.fillText(`#${tokenIdFor(token)}`, x + w - 12, rowY);
  });
  ctx.restore();
}

function drawMatrixCard(x, y, w, h, tokens) {
  drawStageCard({ x, y, w, h, step: "4", title: "Embedding", fill: "#e5eefb", lines: [] });
  const rows = Math.max(2, Math.min(tokens.length, 4));
  const cols = 4;
  const gridX = x + 14;
  const gridY = y + 48;
  const cellW = Math.max(16, Math.min(22, (w - 28) / cols));
  const cellH = 14;
  ctx.save();
  tokens.slice(0, rows).forEach((token, rowIndex) => {
    tokenToVector(token, rowIndex).values.forEach((value, colIndex) => {
      const cx = gridX + colIndex * cellW;
      const cy = gridY + rowIndex * cellH;
      ctx.fillStyle = value >= 0 ? "rgba(53,120,199,0.22)" : "rgba(232,93,79,0.18)";
      ctx.fillRect(cx, cy, cellW - 3, cellH - 3);
    });
  });
  ctx.fillStyle = "#66717c";
  ctx.font = "700 10px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("token × 维度", x + w / 2, y + h - 12);
  ctx.restore();
}

function drawEmbeddingStageCard(x, y, w, h, tokens) {
  drawStageCard({ x, y, w, h, step: "5", title: "矩阵", fill: "#e5eefb", lines: [] });
  const rows = Math.max(2, Math.min(tokens.length, 4));
  const cols = 4;
  const gridW = w - 24;
  const cellW = Math.max(16, Math.min(22, gridW / cols));
  const cellH = 15;
  const gridX = x + (w - cellW * cols) / 2;
  const gridY = y + 48;

  ctx.save();
  tokens.slice(0, rows).forEach((token, rowIndex) => {
    tokenToVector(token, rowIndex).values.forEach((value, colIndex) => {
      const cx = gridX + colIndex * cellW;
      const cy = gridY + rowIndex * cellH;
      ctx.fillStyle = value >= 0 ? "rgba(53,120,199,0.22)" : "rgba(232,93,79,0.18)";
      ctx.fillRect(cx, cy, cellW - 3, cellH - 3);
      ctx.fillStyle = "#182026";
      ctx.font = "700 8px Consolas, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(value.toFixed(1), cx + (cellW - 3) / 2, cy + (cellH - 3) / 2);
    });
  });
  ctx.fillStyle = "#66717c";
  ctx.font = "700 10px Microsoft YaHei, sans-serif";
  ctx.fillText("token × 维度", x + w / 2, y + h - 12);
  ctx.restore();
}

function drawModelCard(x, y, w, h) {
  drawStageCard({ x, y, w, h, step: "6", title: "大模型", fill: "#ffe4df", lines: [] });
  ctx.save();
  const baseX = x + 25;
  const baseY = y + 52;
  const layerGap = 26;
  const nodeGap = 18;
  const layers = [3, 4, 3].map((count, layerIndex) =>
    Array.from({ length: count }, (_, index) => ({
      x: baseX + layerIndex * layerGap,
      y: baseY + index * nodeGap + (4 - count) * 8,
    }))
  );
  ctx.strokeStyle = "rgba(24,32,38,0.18)";
  ctx.lineWidth = 1;
  layers[0].forEach((from) => {
    layers[1].forEach((to) => {
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    });
  });
  layers[1].forEach((from) => {
    layers[2].forEach((to) => {
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    });
  });
  [...layers.flat()].forEach((point, index) => {
    ctx.fillStyle = ["#138f8a", "#3578c7", "#e85d4f"][index % 3];
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawEmbeddingMatrixPreview(x, y, tokens, options = {}) {
  const rows = Math.max(2, Math.min(tokens.length, 4));
  const cols = 4;
  const scale = options.scale || 1;
  const cellW = 22 * scale;
  const cellH = 16 * scale;
  const width = cols * cellW + 18;
  const height = rows * cellH + 28;

  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.strokeStyle = "rgba(53,120,199,0.42)";
  ctx.lineWidth = 2;
  roundRect(x, y, width, height, 7);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#182026";
  ctx.font = `${Math.round(10 * scale)}px Microsoft YaHei, sans-serif`;
  ctx.textAlign = "center";
  ctx.font = `800 ${Math.round(10 * scale)}px Microsoft YaHei, sans-serif`;
  ctx.fillText("Embedding 矩阵", x + width / 2, y + 14);

  tokens.slice(0, rows).forEach((token, rowIndex) => {
    const vector = tokenToVector(token, rowIndex).values;
    vector.forEach((value, colIndex) => {
      const cx = x + 9 + colIndex * cellW;
      const cy = y + 21 + rowIndex * cellH;
      ctx.fillStyle = value >= 0 ? "rgba(53,120,199,0.18)" : "rgba(232,93,79,0.16)";
      ctx.fillRect(cx, cy, cellW - 4, cellH - 3);
      if (options.showNumbers) {
        ctx.fillStyle = "#182026";
        ctx.font = `700 ${Math.round(8 * scale)}px Consolas, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(value.toFixed(1), cx + (cellW - 4) / 2, cy + (cellH - 3) / 2);
      }
    });
  });
  ctx.restore();
}

function drawInputSentence(text, x, y, width) {
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.strokeStyle = "rgba(245,184,75,0.75)";
  ctx.lineWidth = 2;
  roundRect(x, y, width, 48, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#66717c";
  ctx.font = "800 11px Microsoft YaHei, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("原句", x + 12, y + 16);
  ctx.fillStyle = "#182026";
  ctx.font = "800 14px Microsoft YaHei, sans-serif";
  ctx.fillText(truncateCanvasText(text, 10), x + 12, y + 36);
  ctx.restore();
}

function drawFlowArrow(fromX, fromY, toX, toY, color, offset) {
  const angle = Math.atan2(toY - fromY, toX - fromX);
  const t = (animationTick * 1.35 + offset) % 1;
  const px = fromX + (toX - fromX) * t;
  const py = fromY + (toY - fromY) * t;
  const headLength = 8;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.52;
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  ctx.globalAlpha = 0.92;
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(px, py, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLargeModelCore(x, y, width) {
  const layerGap = width > 900 ? 58 : 42;
  const nodeGap = 26;
  const layers = [
    { count: 4, color: "#138f8a" },
    { count: 5, color: "#3578c7" },
    { count: 4, color: "#e85d4f" },
  ].map((layer, layerIndex) => {
    const startY = y - ((layer.count - 1) * nodeGap) / 2;
    return Array.from({ length: layer.count }, (_, index) => ({
      x: x + layerIndex * layerGap,
      y: startY + index * nodeGap,
      color: layer.color,
    }));
  });

  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.68)";
  ctx.strokeStyle = "rgba(24,32,38,0.12)";
  roundRect(x - 24, y - 78, layerGap * 2 + 48, 156, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#182026";
  ctx.font = "800 12px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("大模型主体", x + layerGap, y - 58);

  for (let i = 0; i < layers.length - 1; i += 1) {
    layers[i].forEach((from) => {
      layers[i + 1].forEach((to, index) => {
        ctx.strokeStyle = `rgba(24,32,38,${0.14 + Math.abs(Math.sin(animationTick * 2 + index)) * 0.12})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      });
    });
  }

  layers.flat().forEach((point, index) => {
    ctx.fillStyle = point.color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 6 + Math.sin(animationTick * 4 + index) * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.stroke();
  });
  ctx.restore();
}

function drawProcessBox(text, x, y, width, fill) {
  ctx.save();
  ctx.fillStyle = fill;
  ctx.strokeStyle = "rgba(24,32,38,0.18)";
  ctx.lineWidth = 2;
  roundRect(x, y, width, 36, 7);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#182026";
  ctx.font = "800 12px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + width / 2, y + 18);
  ctx.restore();
}

function drawNetworkTrace(points) {
  const colors = ["#138f8a", "#3578c7", "#e85d4f"];
  for (let layerIndex = 0; layerIndex < points.length - 1; layerIndex += 1) {
    const fromLayer = points[layerIndex];
    const toLayer = points[layerIndex + 1];
    const t = (animationTick * 0.9 + layerIndex * 0.34) % 1;
    fromLayer.forEach((from, index) => {
      const to = toLayer[(index * 2 + layerIndex) % toLayer.length];
      const px = from.x + (to.x - from.x) * t;
      const py = from.y + (to.y - from.y) * t;

      ctx.save();
      ctx.strokeStyle = colors[layerIndex + 1] || "#3578c7";
      ctx.globalAlpha = 0.62;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = colors[layerIndex + 1] || "#3578c7";
      ctx.shadowColor = colors[layerIndex + 1] || "#3578c7";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }
}

function drawMiniMatrix(x, y) {
  const cell = 24;
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.86)";
  ctx.strokeStyle = "rgba(24,32,38,0.18)";
  ctx.lineWidth = 1;
  roundRect(x, y, cell * 3 + 16, cell * 3 + 16, 7);
  ctx.fill();
  ctx.stroke();

  DEMO_MATRIX.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      const cx = x + 8 + colIndex * cell;
      const cy = y + 8 + rowIndex * cell;
      ctx.fillStyle = value >= 0 ? "rgba(19,143,138,0.18)" : "rgba(232,93,79,0.18)";
      ctx.fillRect(cx, cy, cell - 4, cell - 4);
      ctx.fillStyle = "#182026";
      ctx.font = "700 10px Microsoft YaHei, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(value.toFixed(1), cx + (cell - 4) / 2, cy + (cell - 4) / 2);
    });
  });
  ctx.restore();
}

function drawPredictionFlow(width, height) {
  const level = levelById("predict");
  const cy = height * 0.44;
  const modelCenterX = width * 0.5;
  const modelLeftX = modelCenterX - 118;
  const modelRightX = modelCenterX + 118;
  const matrix = drawContextMatrixInput(38, 56);
  const outputX = width - 198;

  drawFlowArrow(matrix.x + matrix.width + 18, cy, modelLeftX - 24, cy, "#3578c7", 0.12);
  drawFlowArrow(modelRightX + 28, cy, outputX - 24, cy, "#e85d4f", 0.42);

  drawProbabilityOutput(outputX, 54, level.choices);
}

function drawContextMatrixInput(x, y) {
  const tokens = ["天气", "大雨", "出门", "带"];
  const cols = 3;
  const cellW = 36;
  const cellH = 22;
  const rowGap = 6;
  const width = 172;
  const height = 146;

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.76)";
  ctx.strokeStyle = "rgba(53, 120, 199, 0.32)";
  ctx.lineWidth = 1.5;
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#182026";
  ctx.font = "800 12px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("上下文 embedding 矩阵", x + width / 2, y + 18);

  tokens.forEach((token, rowIndex) => {
    const rowY = y + 33 + rowIndex * (cellH + rowGap);
    ctx.fillStyle = "#43505a";
    ctx.font = "800 11px Microsoft YaHei, sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(token, x + 41, rowY + cellH / 2);

    tokenToVector(token, rowIndex).values.slice(0, cols).forEach((value, colIndex) => {
      const cx = x + 48 + colIndex * cellW;
      ctx.fillStyle = "rgba(53, 120, 199, 0.13)";
      ctx.strokeStyle = "rgba(24, 32, 38, 0.1)";
      roundRect(cx, rowY, cellW - 6, cellH, 4);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#182026";
      ctx.font = "800 9px Consolas, monospace";
      ctx.textAlign = "center";
      ctx.fillText(formatEmbeddingValue(value), cx + (cellW - 6) / 2, rowY + cellH / 2 + 1);
    });
  });
  ctx.restore();

  return { x, y, width, height };
}

function drawProbabilityOutput(x, y, choices) {
  const width = 166;
  const rowH = 24;
  const height = 148;
  const revealed = true;

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
  ctx.strokeStyle = "rgba(24, 32, 38, 0.14)";
  ctx.lineWidth = 1.2;
  roundRect(x, y - 22, width, height, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#182026";
  ctx.font = "800 12px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("概率向量 p", x + width / 2, y - 4);

  ctx.strokeStyle = "rgba(24, 32, 38, 0.5)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(x + 45, y + 2);
  ctx.lineTo(x + 30, y + 2);
  ctx.lineTo(x + 30, y + 103);
  ctx.lineTo(x + 45, y + 103);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + width - 45, y + 2);
  ctx.lineTo(x + width - 30, y + 2);
  ctx.lineTo(x + width - 30, y + 103);
  ctx.lineTo(x + width - 45, y + 103);
  ctx.stroke();

  choices.forEach((choice, index) => {
    const rowY = y + 18 + index * rowH;
    const value = revealed ? (choice.probability / 100).toFixed(2) : "?";

    ctx.fillStyle = "#43505a";
    ctx.font = "800 10px Microsoft YaHei, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(choice.text, x + 42, rowY);

    ctx.fillStyle = choice.correct && revealed ? "#3e9b61" : "#182026";
    ctx.font = "900 13px Consolas, monospace";
    ctx.textAlign = "right";
    ctx.fillText(value, x + width - 42, rowY);
  });

  ctx.fillStyle = "#66717c";
  ctx.font = "800 10px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("四个候选已归一化，总和 1", x + width / 2, y + height - 9);
  ctx.restore();
}

function drawAttentionFlow(width, height) {
  const level = levelById("attention");
  const words = level.words;
  const cx = width * 0.35;
  const cy = height * 0.5;
  const rx = Math.min(178, width * 0.23);
  const ry = Math.min(82, height * 0.34);
  const current = { x: cx, y: cy, label: "当前位置" };
  const weightMap = new Map([
    ["在", 0.24],
    ["上海", 0.86],
    ["明天", 0.78],
    ["天气", 0.84],
    ["适合", 0.48],
    ["跑步", 0.74],
    ["吗", 0.24],
  ]);
  const colorMap = new Map([
    ["上海", "#3578c7"],
    ["明天", "#f5b84b"],
    ["天气", "#138f8a"],
    ["跑步", "#138f8a"],
  ]);
  const points = words.map((word, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / words.length;
    return {
      word,
      x: cx + Math.cos(angle) * rx,
      y: cy + Math.sin(angle) * ry,
      weight: weightMap.get(word) || 0.15,
      color: colorMap.get(word) || "#9aa8b2",
    };
  });

  ctx.save();
  ctx.strokeStyle = "rgba(24, 32, 38, 0.1)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();

  points.forEach((from, index) => {
    points.forEach((to, toIndex) => {
      if (toIndex <= index || (index + toIndex) % 3 !== 0) return;
      ctx.strokeStyle = "rgba(24, 32, 38, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    });
  });
  ctx.restore();

  points.forEach((point, index) => {
    drawAttentionLink(current, point, point.color, point.weight, index * 0.12);
  });

  points.forEach((point) => {
    drawAttentionWordPill(point.word, point.x, point.y, level.target.includes(point.word), point.color);
  });

  drawAttentionCenter(current.x, current.y);
  drawAttentionHeadSummary(width * 0.64, height * 0.18, level.heads);
}

function drawAttentionLink(from, to, color, weight, offset) {
  const alpha = 0.1 + weight * 0.5;
  const lineWidth = 1 + weight * 3.2;
  const t = (Math.sin(animationTick * 3.2 + offset * 14) + 1) / 2;
  const px = from.x + (to.x - from.x) * t;
  const py = from.y + (to.y - from.y) * t;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();

  if (weight > 0.45) {
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(px, py, 3.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawAttentionWordPill(text, x, y, important, color) {
  const width = Math.max(48, String(text).length * 18 + 18);
  const height = 32;
  ctx.save();
  ctx.fillStyle = important ? "rgba(255, 255, 255, 0.96)" : "rgba(255, 255, 255, 0.82)";
  ctx.strokeStyle = important ? color : "rgba(24, 32, 38, 0.22)";
  ctx.lineWidth = important ? 2.2 : 1.2;
  roundRect(x - width / 2, y - height / 2, width, height, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#182026";
  ctx.font = "800 14px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawAttentionCenter(x, y) {
  ctx.save();
  ctx.fillStyle = "#182026";
  ctx.strokeStyle = "rgba(19, 143, 138, 0.34)";
  ctx.lineWidth = 4;
  roundRect(x - 46, y - 24, 92, 48, 10);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 14px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("当前生成位", x, y - 5);
  ctx.font = "800 11px Microsoft YaHei, sans-serif";
  ctx.fillText("查询 Q", x, y + 13);
  ctx.restore();
}

function drawAttentionHeadSummary(x, y, heads) {
  ctx.save();
  const width = 220;
  const height = 128;
  ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
  ctx.strokeStyle = "rgba(24, 32, 38, 0.14)";
  ctx.lineWidth = 1.2;
  roundRect(x, y, width, height, 9);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#182026";
  ctx.font = "900 13px Microsoft YaHei, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("三个注意力头并行看关系", x + 14, y + 24);

  heads.forEach((head, index) => {
    const rowY = y + 48 + index * 25;
    ctx.fillStyle = head.color;
    ctx.beginPath();
    ctx.arc(x + 19, rowY - 4, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#182026";
    ctx.font = "800 12px Microsoft YaHei, sans-serif";
    ctx.fillText(head.name, x + 32, rowY);
    ctx.fillStyle = "#43505a";
    ctx.font = "700 11px Microsoft YaHei, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(head.focus.join(" / "), x + width - 14, rowY);
    ctx.textAlign = "left";
  });
  ctx.restore();
}

function drawRagFlow(width, height) {
  const docs = levelById("rag").docs;
  const docX = 34;
  const retriever = { x: Math.max(132, width * 0.18), y: height * 0.36, w: 92, h: 58 };
  const context = { x: Math.max(244, width * 0.3), y: height * 0.28, w: 126, h: 88 };

  docs.forEach((doc, index) => {
    const x = docX;
    const y = 55 + index * 48;
    const selected = state.selectedDoc ? state.selectedDoc === doc.id : doc.correct;
    const docLabel = doc.title.replace(/：.*$/, "");
    drawDocument(x, y, docLabel, selected);
    drawConnectorArrow(x + 78, y + 18, retriever.x, retriever.y + retriever.h / 2, selected ? "#138f8a" : "#a9b4bc", index * 0.08);
  });

  drawRagProcessBox(retriever.x, retriever.y, retriever.w, retriever.h, "检索器", "筛选相关资料", "#dff4f1", "#138f8a");
  drawConnectorArrow(retriever.x + retriever.w, retriever.y + retriever.h / 2, context.x, context.y + context.h / 2, "#f5b84b", 0.22);
  drawRagContextBox(context.x, context.y, context.w, context.h);
  const modelInputX = Math.max(context.x + context.w + 38, width * 0.44);
  drawConnectorArrow(context.x + context.w, context.y + context.h / 2, modelInputX, height * 0.44, "#3578c7", 0.34);
  const outputBox = {
    x: Math.min(width - 202, Math.max(modelInputX + 250, width * 0.73)),
    y: height * 0.25,
    w: 172,
    h: 96,
  };
  drawConnectorArrow(Math.max(modelInputX + 142, width * 0.65), height * 0.44, outputBox.x, outputBox.y + outputBox.h / 2, "#3e9b61", 0.48);
  drawRagOutputBox(outputBox.x, outputBox.y, outputBox.w, outputBox.h);
  drawLabel("检索 → 拼接上下文 → 模型生成", 34, 38, "#182026");
}

function drawRagProcessBox(x, y, width, height, title, subtitle, fill, stroke) {
  ctx.save();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#182026";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 13px Microsoft YaHei, sans-serif";
  ctx.fillText(title, x + width / 2, y + height / 2 - 8);
  ctx.font = "800 10px Microsoft YaHei, sans-serif";
  ctx.fillText(subtitle, x + width / 2, y + height / 2 + 11);
  ctx.restore();
}

function drawRagContextBox(x, y, width, height) {
  ctx.save();
  ctx.fillStyle = "rgba(229, 238, 251, 0.96)";
  ctx.strokeStyle = "#3578c7";
  ctx.lineWidth = 2;
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#182026";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 13px Microsoft YaHei, sans-serif";
  ctx.fillText("上下文包", x + width / 2, y + 19);
  ctx.font = "800 10px Microsoft YaHei, sans-serif";
  ctx.fillText("问题 + 证据片段", x + width / 2, y + 43);
  ctx.fillStyle = "#43505a";
  ctx.fillText("资料 A / B", x + width / 2, y + 65);
  ctx.restore();
}

function drawRagOutputBox(x, y, width, height) {
  ctx.save();
  ctx.fillStyle = "rgba(239, 248, 241, 0.96)";
  ctx.strokeStyle = "#3e9b61";
  ctx.lineWidth = 2;
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#182026";
  ctx.font = "900 13px Microsoft YaHei, sans-serif";
  ctx.fillText("证据约束后的输出", x + width / 2, y + 20);
  ctx.font = "800 11px Microsoft YaHei, sans-serif";
  ctx.fillStyle = "#267642";
  ctx.fillText("相对准确回答概率", x + width / 2, y + 45);
  ctx.font = "800 10px Microsoft YaHei, sans-serif";
  ctx.fillStyle = "#43505a";
  ctx.fillText("p(不适合) ↑", x + width / 2, y + 67);
  ctx.fillText("仍需核验资料", x + width / 2, y + 83);
  ctx.restore();
}

function drawSummaryFlow(width, height) {
  const margin = 34;
  const top = 56;
  const centerY = top + 78;
  const gap = Math.max(18, Math.min(32, width * 0.035));
  let inputW = 96;
  let coreW = 198;
  let outputW = 140;
  let checkW = 156;
  const available = width - margin * 2;
  const baseTotal = inputW + coreW + outputW + checkW + gap * 3;

  if (baseTotal > available) {
    const scale = Math.max(0.72, (available - gap * 3) / (inputW + coreW + outputW + checkW));
    inputW = Math.round(inputW * scale);
    coreW = Math.round(coreW * scale);
    outputW = Math.round(outputW * scale);
    checkW = Math.round(checkW * scale);
  }

  const totalWidth = inputW + coreW + outputW + checkW + gap * 3;
  const inputX = Math.max(margin, margin + (available - totalWidth) / 2);
  const coreX = inputX + inputW + gap;
  const outputX = coreX + coreW + gap;
  const checkX = outputX + outputW + gap;

  drawLabel("理解闭环：材料进入模型，结果必须回到人和证据那里校验", margin, 34, "#182026");
  drawSummaryInputStack(inputX, top, inputW);
  drawConnectorArrow(inputX + inputW + 6, centerY, coreX - 12, centerY, "#138f8a", 0.08);
  drawSummaryCore(coreX, top, coreW, 132);
  drawConnectorArrow(coreX + coreW + 8, centerY, outputX - 12, centerY, "#3578c7", 0.24);
  drawSummaryOutput(outputX, top + 10, outputW, 112);
  drawConnectorArrow(outputX + outputW + 8, centerY, checkX - 12, centerY, "#e85d4f", 0.38);
  drawSummaryCheck(checkX, top + 10, checkW, 112);
}
function drawSummaryInputStack(x, y, width = 94) {
  drawSummaryPill("文字", x, y, "#dff4f1", "#138f8a", width);
  drawSummaryPill("上下文", x, y + 48, "#e5eefb", "#3578c7", width);
  drawSummaryPill("资料", x, y + 96, "#fff1cf", "#f5b84b", width);
}

function drawSummaryPill(text, x, y, fill, stroke, width = 94) {
  ctx.save();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;
  roundRect(x, y, width, 38, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#182026";
  ctx.font = "900 15px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + width / 2, y + 20);
  ctx.restore();
}

function drawSummaryCore(x, y, width, height) {
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.strokeStyle = "#182026";
  ctx.lineWidth = 2;
  roundRect(x, y, width, height, 10);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#182026";
  ctx.font = "900 14px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("大模型生成过程", x + width / 2, y + 20);
  const rows = [
    ["向量化", "#138f8a"],
    ["概率生成", "#f5b84b"],
    ["注意力", "#3578c7"],
    ["资料增强", "#e85d4f"],
  ];
  rows.forEach(([label, color], index) => {
    const rowY = y + 48 + index * 20;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + 20, rowY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#182026";
    ctx.font = "800 12px Microsoft YaHei, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + 34, rowY);
  });
  ctx.restore();
}

function drawSummaryOutput(x, y, width, height) {
  ctx.save();
  ctx.fillStyle = "rgba(239, 248, 241, 0.95)";
  ctx.strokeStyle = "#3e9b61";
  ctx.lineWidth = 2;
  roundRect(x, y, width, height, 10);
  ctx.fill();
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#182026";
  ctx.font = "900 14px Microsoft YaHei, sans-serif";
  ctx.fillText("生成结果", x + width / 2, y + 24);
  ctx.font = "800 11px Microsoft YaHei, sans-serif";
  ctx.fillStyle = "#43505a";
  ctx.fillText("像答案", x + width / 2, y + 50);
  ctx.fillText("但可能错", x + width / 2, y + 72);
  ctx.fillText("概率生成", x + width / 2, y + 94);
  ctx.restore();
}

function drawSummaryCheck(x, y, width, height) {
  ctx.save();
  ctx.fillStyle = "rgba(255, 241, 207, 0.94)";
  ctx.strokeStyle = "#f5b84b";
  ctx.lineWidth = 2;
  roundRect(x, y, width, height, 10);
  ctx.fill();
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#182026";
  ctx.font = "900 14px Microsoft YaHei, sans-serif";
  ctx.fillText("人的核验", x + width / 2, y + 24);
  ctx.font = "800 11px Microsoft YaHei, sans-serif";
  ctx.fillStyle = "#43505a";
  ctx.fillText("查事实", x + width / 2, y + 50);
  ctx.fillText("看逻辑", x + width / 2, y + 72);
  ctx.fillText("担责任", x + width / 2, y + 94);
  ctx.restore();
}

function drawFinalFlow(width, height) {
  const phrases = ["Token", "预测", "注意力", "RAG"];
  phrases.forEach((phrase, index) => {
    const angle = animationTick + (Math.PI * 2 * index) / phrases.length;
    const x = width * 0.26 + Math.cos(angle) * 82;
    const y = height * 0.44 + Math.sin(angle) * 62;
    drawTokenBox(phrase, x, y, index, ["#dff4f1", "#fff1cf", "#e5eefb", "#ffe4df"][index]);
    drawArrow(x + 42, y + 16, width * 0.39, height * 0.44, ["#138f8a", "#f5b84b", "#3578c7", "#e85d4f"][index], index * 0.08);
  });
}

function drawTokenBox(text, x, y, index, fill = "#ffffff") {
  ctx.save();
  const w = Math.max(46, Math.min(72, 20 + String(text).length * 16));
  ctx.fillStyle = fill;
  ctx.strokeStyle = ["#138f8a", "#f5b84b", "#3578c7", "#e85d4f"][index % 4];
  ctx.lineWidth = 2;
  roundRect(x, y, w, 34, 7);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#182026";
  ctx.font = "700 14px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + w / 2, y + 17);
  ctx.restore();
}

function drawDocument(x, y, text, selected) {
  ctx.save();
  ctx.fillStyle = selected ? "#dff4f1" : "#ffffff";
  ctx.strokeStyle = selected ? "#138f8a" : "#d9e1e6";
  ctx.lineWidth = 2;
  roundRect(x, y, 70, 36, 7);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#182026";
  ctx.font = "700 12px Microsoft YaHei, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + 9, y + 19);
  ctx.restore();
}

function drawLabel(text, x, y, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = "800 13px Microsoft YaHei, sans-serif";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawArrow(fromX, fromY, toX, toY, color, offset) {
  const t = (Math.sin(animationTick * 3 + offset * 12) + 1) / 2;
  const px = fromX + (toX - fromX) * t;
  const py = fromY + (toY - fromY) * t;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.32;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(px, py, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawConnectorArrow(fromX, fromY, toX, toY, color, offset) {
  const angle = Math.atan2(toY - fromY, toX - fromX);
  const headLength = 8;
  const t = (Math.sin(animationTick * 2.2 + offset * 10) + 1) / 2;
  const px = fromX + (toX - fromX) * t;
  const py = fromY + (toY - fromY) * t;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.82;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(px, py, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCurve(fromX, fromY, toX, toY, color, alpha) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = alpha > 0.2 ? 2.5 : 1;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  const midX = (fromX + toX) / 2;
  ctx.bezierCurveTo(midX, fromY - 50, midX, toY + 50, toX, toY);
  ctx.stroke();
  ctx.restore();
}

function roundRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

dom.resetButton.addEventListener("click", () => {
  state.levelIndex = 0;
  state.score = 0;
  state.completed = new Set();
  resetTransientState();
  render();
  showToast("已重新开始。");
});

window.addEventListener("resize", () => resizeCanvasForDisplay());

render();
drawCanvas();
