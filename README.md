# Parity Helper

## Features

### Question Dependencies
- Some questions can be configured to be skipped based on the answer to the previous question
- Use the `skipIfPreviousAnswerIs` property to define this behavior

### N/A Answers
- Questions can be marked as "Not Applicable" (N/A)
- N/A answers are excluded from score calculations
- Use this for questions that don't apply to your specific project context

### Question Descriptions
- Each question can have an optional description to provide additional context
- Descriptions appear directly below the question text
- Use descriptions to clarify the intent or provide examples

### Early Termination
- The first question acts as a gate for the entire assessment
- If the first question is answered with "No", the assessment immediately shows a special results page
- This helps prevent unnecessary assessments of projects that aren't ready

## Question Configuration

```typescript
interface Question {
  id: string;
  text: string;
  description?: string; // Optional, provides additional context
  category: string;
  skipIfPreviousAnswerIs?: 'yes' | 'no'; // Optional, controls question visibility
}
```
