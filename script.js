const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector(".menu-toggle");
const scrollTopButton = document.querySelector(".scroll-top");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("[data-nav] a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const workflowData = [
  {
    icon: "🧩",
    title: "بنك أسئلة ذكي",
    text: "الأستاذ يضيف الأسئلة ويصنفها حسب المادة والوحدة والصعوبة، ثم يختار النظام منها تلقائياً عند إنشاء الامتحان."
  },
  {
    icon: "🗓️",
    title: "جدولة وربط الطلاب",
    text: "الإدارة تحدد الموعد والمدة والطلاب المسموح لهم بالدخول، مع إمكانية استيراد القوائم من Excel."
  },
  {
    icon: "🔐",
    title: "دخول آمن للطالب",
    text: "الطالب يدخل ضمن الوقت المحدد بعد التحقق من حسابه، ويمكن تفعيل OTP والجلسة الواحدة حسب مستوى الحماية."
  },
  {
    icon: "⚡",
    title: "تصحيح وتقارير",
    text: "بعد التسليم يتم تصحيح الأسئلة المغلقة فوراً، ثم إصدار النتائج والتقارير وحفظ المحاولة في الأرشيف."
  }
];

const flowButtons = document.querySelectorAll(".flow-item");
const workflowIcon = document.querySelector("[data-workflow-icon]");
const workflowTitle = document.querySelector("[data-workflow-title]");
const workflowText = document.querySelector("[data-workflow-text]");
const progress = document.querySelector("[data-progress]");

flowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const step = Number(button.dataset.step);
    flowButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const data = workflowData[step];
    workflowIcon.textContent = data.icon;
    workflowTitle.textContent = data.title;
    workflowText.textContent = data.text;
    progress.style.width = `${(step + 1) * 25}%`;
  });
});

const securityData = {
  basic: {
    title: "حماية أساسية",
    items: [
      "رقم جامعي وكلمة مرور.",
      "منع الطالب غير المسجل من دخول المادة.",
      "حفظ محاولة واحدة لكل طالب.",
      "تسجيل وقت الدخول والتسليم."
    ]
  },
  medium: {
    title: "حماية متوسطة",
    items: [
      "كل مزايا الحماية الأساسية.",
      "رمز تحقق OTP قبل دخول الامتحان.",
      "جلسة واحدة نشطة لكل طالب.",
      "تسجيل الجهاز والمتصفح وعنوان IP.",
      "تنبيه عند الخروج المتكرر من صفحة الامتحان."
    ]
  },
  high: {
    title: "حماية عالية",
    items: [
      "كل مزايا الحماية المتوسطة.",
      "لقطة كاميرا عند بداية الامتحان.",
      "مراقبة مباشرة للحالات المشبوهة.",
      "سجل تدقيق مفصل لكل حركة داخل الامتحان.",
      "إمكانية ربط لاحق مع متصفح امتحاني آمن."
    ]
  }
};

const securityTabs = document.querySelectorAll(".security-tab");
const securityTitle = document.querySelector("[data-security-title]");
const securityList = document.querySelector("[data-security-list]");

securityTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    securityTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    const selected = securityData[tab.dataset.security];
    securityTitle.textContent = selected.title;
    securityList.innerHTML = selected.items.map((item) => `<li>${item}</li>`).join("");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

window.addEventListener("scroll", () => {
  if (window.scrollY > 650) {
    scrollTopButton.classList.add("show");
  } else {
    scrollTopButton.classList.remove("show");
  }
});

scrollTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const leadForm = document.querySelector("[data-lead-form]");
const success = document.querySelector("[data-form-success]");

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(leadForm);
  const lead = Object.fromEntries(formData.entries());

  console.log("Lead request:", lead);

  success.hidden = false;
  leadForm.reset();

  setTimeout(() => {
    success.hidden = true;
  }, 7000);
});
