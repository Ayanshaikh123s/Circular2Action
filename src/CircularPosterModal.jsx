import React from "react";
import { isEventCircular, isExamCircular } from "./utils/circularClassifier";
import RealEventPosterModal from "./RealEventPosterModal";
import ExamTimetableModal from "./ExamTimetableModal";
import WhatsAppNoticeModal from "./WhatsAppNoticeModal";

/**
 * Master Modal Router:
 * - If circular is an EXAMINATION (Mid-term, End-sem, Date-sheet, Timetable, Internal test):
 *   Shows the Authentic College Examination Timetable Date-Sheet!
 * - If circular is an EVENT (Festivals like Navratri/Diwali, Hackathons, Workshops, Sports, Cultural):
 *   Shows the Real AI Event Poster Flyer with event color palette & AI Action bullets!
 * - If circular is a General Notice (Fees, Holidays, General memos):
 *   Shows the WhatsApp-style Faculty Notice Memo!
 */
export default function CircularPosterModal({ circular, onClose }) {
  if (!circular) return null;

  // 1. Examination notices get structured timetable sheet
  if (isExamCircular(circular)) {
    return <ExamTimetableModal circular={circular} onClose={onClose} />;
  }

  // 2. Events get real event poster flyer
  if (isEventCircular(circular)) {
    return <RealEventPosterModal circular={circular} onClose={onClose} />;
  }

  // 3. All other notices get clean WhatsApp faculty notice
  return <WhatsAppNoticeModal circular={circular} onClose={onClose} />;
}
