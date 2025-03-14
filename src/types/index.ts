import type { Component } from 'vue';

/**
 * 导出所有类型定义
 */

/**
 * 通用响应接口
 */
export interface BaseResponse {
  /** 是否成功 */
  success: boolean;
  /** 响应消息 */
  message: string;
}

/**
 * 轮播图项目接口
 */
export interface CarouselItem {
  /** 项目ID */
  id: number;
  /** 标题 */
  title: string;
  /** 描述 */
  description: string;
  /** 图片URL */
  image: string;
}

/**
 * 发展历程阶段接口
 */
export interface DevelopmentStage {
  /** 时间段 */
  period: string;
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
  /** 类型 */
  type: 'primary' | 'success' | 'warning' | 'info';
  /** 图标组件 */
  icon: Component;
  /** 图片URL */
  image: string;
  /** 特点列表 */
  features: string[];
  /** 事件列表 */
  events: string[];
  /** 事件详情 */
  eventDetails?: string[];
}

/**
 * 游戏状态类型
 */
export type GameStatus = '未开始' | '进行中' | '已暂停' | '已结束'; 