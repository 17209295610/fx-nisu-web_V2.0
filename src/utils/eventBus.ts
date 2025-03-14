import mitt from 'mitt'
import type { Emitter } from 'mitt'
import type { EventBusEvents } from '@/types/events'

const eventBus: Emitter<EventBusEvents> = mitt<EventBusEvents>()

export default eventBus 