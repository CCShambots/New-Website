---
title: "[TEST] Sample Blog Post - Front Matter & Content Demo"
date: "2026-09-03"
author: "Test Author (Sample)"
tags: ["test", "demo", "sample"]
summary: "This is a placeholder summary for testing front matter parsing and site generation."
coverImage: "/images/sample-placeholder.jpg"
---

# [TEST] Sample Blog Post Title

> **Note:** This is a test document used to verify front matter parsing, layout rendering, and build pipeline scripts.

---

## 1. Sample Formatting & Lists

This paragraph contains **sample bold text**, *sample italic text*, and a [test link](#). Below is a list of sample items:

* **Test Item A:** Verify bullet point alignment.
* **Test Item B:** Verify nested content styling.
* **Test Item C:** Verify line-height and spacing.

---

## 2. Sample Data Table

| Field Name | Variable Type | Example Value | Notes |
| :--- | :--- | :--- | :--- |
| **`title`** | String | `"[TEST] Sample Blog Post"` | Page heading |
| **`date`** | String (YYYY-MM-DD) | `"2026-09-03"` | Publication date |
| **`draft`** | Boolean | `true` | Build status |

---

## 3. Sample Image Placeholder

<Image alt="Test image placeholder showing a mountain landscape" caption="[TEST] Sample image caption for layout verification" src="image_agent_tag_12075830631971480082"/>

---

## 4. Sample Code Block

```javascript
// Test snippet for syntax highlighting verification
function runTestPipeline(input) {
  console.log("[TEST] Processing file:", input);
  return { status: "success", timestamp: Date.now() };
}

runTestPipeline("test-sample-post.md");
```

## End of Test Document

This concludes the placeholder content. Remove or replace this file once site generation tests are complete.