#include <linux/module.h>
#include <linux/proc_fs.h>
#include <linux/sched.h>   // para la estructura task_struct
#include <linux/seq_file.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Jhonathan Tocay");
MODULE_DESCRIPTION("Informacion del Proceso");
MODULE_VERSION("1.0");

/* Used in tsk->__state: */
#define TASK_RUNNING			0x00000000
#define TASK_INTERRUPTIBLE		0x00000001
#define TASK_UNINTERRUPTIBLE		0x00000002
#define __TASK_STOPPED			0x00000004
#define __TASK_TRACED			0x00000008
/* Used in tsk->exit_state: */
#define EXIT_DEAD			0x00000010
#define EXIT_ZOMBIE			0x00000020
#define EXIT_TRACE			(EXIT_ZOMBIE | EXIT_DEAD)

static int escribir_a_proc(struct seq_file *file_proc, void *v)
{
    struct task_struct *task;
    seq_printf(file_proc, "{\"procesos\": [");

    // Iterar sobre la lista de procesos
    for_each_process(task) {
        seq_printf(file_proc, "{ \"pid\": %d, \"nombre\": \"%s\", \"estados\": [", task->pid, task->comm);

        // Verificar estados
        if (task->__state & TASK_RUNNING)
            seq_printf(file_proc, "\"TASK_RUNNING\", ");
        if (task->__state & TASK_INTERRUPTIBLE)
            seq_printf(file_proc, "\"TASK_INTERRUPTIBLE\", ");
        if (task->__state & TASK_UNINTERRUPTIBLE)
            seq_printf(file_proc, "\"TASK_UNINTERRUPTIBLE\", ");
        if (task->__state & __TASK_STOPPED)
            seq_printf(file_proc, "\"__TASK_STOPPED\", ");
        if (task->__state & __TASK_TRACED)
            seq_printf(file_proc, "\"__TASK_TRACED\", ");
        if (task->__state & TASK_DEAD)
            seq_printf(file_proc, "\"TASK_DEAD\", ");

        seq_printf(file_proc, "]},");
    }

    seq_printf(file_proc, "]}");
    return 0;
}

static int abrir_aproc(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_a_proc, NULL);
}

static struct proc_ops archivo_operaciones = {
    .proc_open = abrir_aproc,
    .proc_read = seq_read,
};

static int __init modulo_init(void)
{
    proc_create("modulo_proceso", 0, NULL, &archivo_operaciones);
    printk(KERN_INFO "Modulo Proceso montado\n");
    return 0;
}

static void __exit modulo_cleanup(void)
{
    remove_proc_entry("modulo_proceso", NULL);
    printk(KERN_INFO "Modulo Proceso eliminado \n");
}

module_init(modulo_init);
module_exit(modulo_cleanup);
