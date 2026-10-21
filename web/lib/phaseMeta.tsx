"use client";

// Icono Phosphor de cada módulo — librería curada, un solo estilo (duotone).
import type { Icon } from "@phosphor-icons/react";
import {
  HandWaving, UsersThree, Alarm, ForkKnife, HouseLine, SoccerBall,
  GraduationCap, TShirt, Stethoscope, Train, Envelope, ClockCounterClockwise,
  BookOpen, Sparkle, ClockClockwise, Airplane, Baby, HandHeart, MapTrifold,
  ChatCenteredText, Scales, HeartStraight, Confetti, Briefcase, Exam,
  GlobeHemisphereWest, Coffee, ShoppingCart, Bus,
} from "@phosphor-icons/react";

export const PHASE_ICON: Record<string, Icon> = {
  fi: Sparkle,
  f0: HandWaving,
  f1: UsersThree,
  f2: Alarm,
  f3: ForkKnife,
  f4: HouseLine,
  f5: SoccerBall,
  f6: GraduationCap,
  f7: TShirt,
  f8: Stethoscope,
  f9: Train,
  f10: Envelope,
  f11: ClockCounterClockwise,
  // A2
  a2m1: ClockClockwise,
  a2m2: Airplane,
  a2m3: Baby,
  a2m4: HandHeart,
  a2m5: MapTrifold,
  a2m6: ChatCenteredText,
  a2m7: Scales,
  a2m8: HeartStraight,
  a2m9: Confetti,
  a2m10: Briefcase,
  a2exam: Exam,
  // Inglés A1
  ena1m1: HandWaving,
  ena1m2: UsersThree,
  ena1m3: GlobeHemisphereWest,
  ena1m4: Alarm,
  ena1m5: Coffee,
  ena1m6: ShoppingCart,
  ena1m7: HouseLine,
  ena1m8: SoccerBall,
  ena1m9: Briefcase,
  ena1m10: Bus,
  ena1m11: Confetti,
  ena1m12: Exam,
};

export function PhaseIcon({ id, size = 24, color }: { id: string; size?: number; color?: string }) {
  const IconCmp = PHASE_ICON[id] ?? BookOpen;
  return <IconCmp size={size} weight="duotone" color={color} aria-hidden />;
}
